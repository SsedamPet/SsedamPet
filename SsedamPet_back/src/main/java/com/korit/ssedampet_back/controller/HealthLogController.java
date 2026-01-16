package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.request.HealthLogCreateReqDto;
import com.korit.ssedampet_back.dto.request.HealthLogUpdateReqDto;
import com.korit.ssedampet_back.dto.response.healthlog.HealthLogRespDto;
import com.korit.ssedampet_back.dto.response.healthlog.HealthWeeklyComparisonDto;
import com.korit.ssedampet_back.service.HealthLogService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/healthlog")
public class HealthLogController {

    private final HealthLogService healthLogService;

    // healthlog 조회
    @GetMapping("/today")
    public ResponseEntity<HealthLogRespDto> getTodayLog(@RequestParam int petId, @RequestParam LocalDate writeDate) {
        return ResponseEntity.ok(healthLogService.getTodayLog(petId, writeDate));
    }

    // healthlog 신규작성
    @PostMapping("")
    public ResponseEntity<?> createHealthLog(@RequestBody HealthLogCreateReqDto createReqDto) {
        return ResponseEntity.ok(healthLogService.createHealthLog(createReqDto));
    }

    // 기존 healthlog 수정
    @PatchMapping("/{healthlogId}")
    public ResponseEntity<?> updateHealthLog(
            @PathVariable int healthlogId,
            @RequestBody HealthLogUpdateReqDto updateReqDto) {
        updateReqDto.setHealthlogId(healthlogId);
        return ResponseEntity.ok(healthLogService.updateHealthLog(updateReqDto));
    }

    // 주간 건강기록 요약
    @GetMapping("/weekly/{petId}")
    public ResponseEntity<HealthWeeklyComparisonDto> weeklyHealthLog(
            @PathVariable int petId) {
        return ResponseEntity.ok(healthLogService.getWeeklyAverage(petId));
    }


}
