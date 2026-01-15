package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.response.healthlog.HealthLogRespDto;
import com.korit.ssedampet_back.service.HealthLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/healthlog")
public class HealthLogController {

    private final HealthLogService healthLogService;

    @GetMapping("/today")
    public ResponseEntity<HealthLogRespDto> getTodayLog(@RequestParam int petId, @RequestParam LocalDate writeDate) {
        return ResponseEntity.ok(healthLogService.getTodayLog(petId, writeDate));

    }
}
