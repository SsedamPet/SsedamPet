package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.security.PrincipalUser;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notices")
public class NoticeController {
    private final NoticeService noticeService;

    // TODO: Principal 유저 생성시 나에게 권한 부여
    /*private int me() {
        return PrincipalUser.getAuthenticatedPrincipalUser().getUser().getUserId();
    }*/
}

/*public SseEmitter stream (
        HttpServletRequest request,
        @RequestHeader(value = "Last-Event_ID", required = false) String lastEventId
) {
    int userId = me();
    return noticeService.connect(userId, lastEventId);
}*/

// 알림목록(최신순)
/*public ResponseEntity<List<NoticeDto>> list (
        @RequestParam(defaultValue = "20") int limit,
        @RequestParam(defaultValue = "0") int offset
) {
    return ResponseEntity.ok(noticeService.getMyNotices(me(), limit, offset));
}*/

