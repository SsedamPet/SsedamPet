package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.response.main.MainDashboardRespDto;
import com.korit.ssedampet_back.service.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<MainDashboardRespDto> getMainDashBoard() {
        //int userId = SecurityContextHolder.getContext().getAuthentication().getPrincipal().getUserId();
        int userId = 1;

        MainDashboardRespDto dashboardData = mainService.getMainDashboard(userId);
        return ResponseEntity.ok(dashboardData);

    }
}
