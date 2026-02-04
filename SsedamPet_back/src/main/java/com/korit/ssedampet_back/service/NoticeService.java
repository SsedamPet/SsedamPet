package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.response.main.NoticeDto;
import com.korit.ssedampet_back.mapper.NoticeMapper;
import com.korit.ssedampet_back.repository.NoticeEmitterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
@RequiredArgsConstructor
public class NoticeService {
    // SSE 연결 유지 시간(1시간). 만료시 자동 재연결
    private static final long SSE_CONNECTING_TIME = 60L * 60L * 1000L;
    // 연결이 살아있는지 확인하는 시간 20초. 연결 끊김 방지
    private static final long KEEP_ALIVE_CHECK_TIME = 20L;

    private final NoticeMapper noticeMapper;
    private final NoticeEmitterRepository noticeEmitterRepository;

    // 연결 중인 유저들의 연결 객체(Emitter) 저장소
    private final Map<Integer, List<SseEmitter>> emitters = new ConcurrentHashMap<>();

    // 주기적으로 핑 날리는 스케쥴러 서비스(스레드 1개 사용)
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public SseEmitter connect(int userId, String lastEventId) {
        SseEmitter emitter = new SseEmitter(SSE_CONNECTING_TIME);

        noticeEmitterRepository.add(userId, emitter);

        emitter.onCompletion(() -> noticeEmitterRepository.remove(userId, emitter));
        emitter.onTimeout(() -> noticeEmitterRepository.remove(userId, emitter));
        emitter.onError((e) -> noticeEmitterRepository.remove(userId, emitter));

        try {
            emitter.send(SseEmitter.event().name("connected").data("ok"));
        } catch (IOException e) {
            noticeEmitterRepository.remove(userId, emitter);
            emitter.completeWithError(e);
            return emitter;
        }

        // KEEP_ALIVE 설정(20초마다 ping 이벤트 보냄. 연결 끊김 방지)
        AtomicBoolean closed = new AtomicBoolean(false);
        ScheduledFuture<?> keepAlive = scheduler.scheduleAtFixedRate(() -> {
            if (closed.get()) return;
            try {
                emitter.send(SseEmitter.event().name("ping").data("ping"));
            } catch (Exception e) {
                closed.set(true);
                noticeEmitterRepository.remove(userId, emitter);
                emitter.complete();
            }
        }, KEEP_ALIVE_CHECK_TIME, KEEP_ALIVE_CHECK_TIME, TimeUnit.SECONDS);

        emitter.onCompletion(() -> keepAlive.cancel(true));
        emitter.onTimeout(() -> keepAlive.cancel(true));
        emitter.onError((e) -> keepAlive.cancel(true));

        if (lastEventId != null && !lastEventId.isBlank()) {
            int lastId = parseIntSafe(lastEventId);
            if (lastId > 0) {
                List<NoticeDto> missed = noticeMapper.findAfterId(userId, lastId);
                for (NoticeDto dto : missed) {
                    sendToOneEmitter(userId, emitter, dto);
                }
            }
        }

        return emitter;
    }
    // 사용자의 알림 목록 최신순 가져옴
    public List<NoticeDto> getMyNotices(int userId, int limit, int offset) {
        return noticeMapper.findByUserId(userId, limit, offset);
    }

    // 아직 읽지 않은 알림이 몇개인지
    public int getUnreadCnt(int userId) {
        return noticeMapper.countUnread(userId);
    }

    // 특정 알림 클릭할 때 "읽음"으로 처리
    @Transactional
    public int markRead(int userId, int noticeId) {
        return noticeMapper.markRead(userId, noticeId);
    }

    // "모두 읽음" 눌렀을 때 처리
    @Transactional
    public int markReadAll(int userId) {
        return noticeMapper.markReadAll(userId);
    }

    // 알림 생성 후 실시간 처리하는 메서드(좋아요, 댓글 서비스에서)
    @Transactional
    public void createAndPush(NoticeDto dto) {
        // DB에 알림내용 저장
        noticeMapper.insertNotice(dto);

        // 실시간 전송
        push(dto.getUserId(), dto);
    }

    // 접속 중인 유저에게 알림 보냄
    public void push(int userId, NoticeDto dto) {
        List<SseEmitter> list = emitters.getOrDefault(userId, Collections.emptyList());
        if (list.isEmpty()) {
            return;
        }

        for (SseEmitter emitter : list) {
            sendToOneEmitter(userId, emitter, dto);
        }
    }



    // 실제 데이터를 전송하는 로직
    private void sendToOneEmitter(int userId, SseEmitter emitter, NoticeDto dto) {
        try {
            emitter.send(SseEmitter.event()
                    .id(String.valueOf(dto.getNoticeId()))
                    .name("notice")
                    .data(dto));
        } catch (Exception e) {
            noticeEmitterRepository.remove(userId, emitter); // 전송 실패 시 연결 제거
            try {
                emitter.complete();
            } catch (Exception ignored) {}
        }


    }

    // 문자열 ID를 숫자로 안전하게 바꾸는 함수
    private int parseIntSafe(String v) {
        try {
            return Integer.parseInt(v.trim());
        } catch (Exception e) {
            return 0;
        }
    }
}


