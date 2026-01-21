package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.response.main.NoticeDto;
import com.korit.ssedampet_back.security.PrincipalUser;
import com.korit.ssedampet_back.service.NoticeService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notices")
public class NoticeController {

    private final NoticeService noticeService;

    private int me() {
        return PrincipalUser.getAuthenticatedPrincipalUser().getUser().getUserId();
    }


    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter stream(
            HttpServletRequest request,
            @RequestHeader(value = "Last-Event-ID", required = false) String lastEventId
    ) {
        int userId = me();
        return noticeService.connect(userId, lastEventId);
    }


    // 알림 목록(최신순)
    @GetMapping("latest")
    public ResponseEntity<List<NoticeDto>> list(
            @RequestParam(defaultValue = "20") int limit,
            @RequestParam(defaultValue = "0") int offset
    ) {
        return ResponseEntity.ok(noticeService.getMyNotices(me(), limit, offset));
    }


    // 미읽음 카운트(뱃지)
    @GetMapping("/unread-count")
    public ResponseEntity<Integer> unreadCount() {
        return ResponseEntity.ok(noticeService.getUnreadCnt(me()));
    }

    // 단건 읽음 처리
    @PatchMapping("/{noticeId}/read")
    public ResponseEntity<Integer> markRead(@PathVariable int noticeId) {
        return ResponseEntity.ok(noticeService.markRead(me(), noticeId));
    }


    // 전체 읽음 처리
    @PatchMapping("/read-all")
    public ResponseEntity<Integer> markReadAll() {
        return ResponseEntity.ok(noticeService.markReadAll(me()));
    }
}
