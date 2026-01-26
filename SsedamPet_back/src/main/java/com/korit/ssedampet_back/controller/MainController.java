package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.response.main.MainDashboardRespDto;
import com.korit.ssedampet_back.security.PrincipalUser;
import com.korit.ssedampet_back.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/main")
public class MainController {

    private final MainService mainService;

    @GetMapping("/dashboard")
    public ResponseEntity<?> getMainDashBoard() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // 1. 로그인하지 않은 경우 (문자열 "anonymousUser"인 경우) 처리
        if (principal instanceof String) {
            return ResponseEntity.status(401).body("로그인이 필요한 서비스입니다.");
        }

        // 2. 로그인한 경우 안전하게 형변환
        PrincipalUser principalUser = (PrincipalUser) principal;
        int userId = principalUser.getUser().getUserId();

        MainDashboardRespDto dashboardData = mainService.getMainDashboard(userId);
        return ResponseEntity.ok(dashboardData);

    }
}
