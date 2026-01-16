package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.HealthLogCreateReqDto;
import com.korit.ssedampet_back.dto.request.HealthLogUpdateReqDto;
import com.korit.ssedampet_back.dto.response.healthlog.HealthLogRespDto;
import com.korit.ssedampet_back.dto.response.healthlog.HealthWeeklyAvgDto;
import com.korit.ssedampet_back.dto.response.healthlog.HealthWeeklyComparisonDto;
import com.korit.ssedampet_back.mapper.HealthLogMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class HealthLogService {

    private final HealthLogMapper healthLogMapper;

    // 1. healthlog 조회
    public HealthLogRespDto getTodayLog(int petId, LocalDate writeDate) {
        return healthLogMapper.findByPetIdAndDate(petId, writeDate);
    }

    // 2. 새 healthlog 작성
    @Transactional
    public int createHealthLog(HealthLogCreateReqDto createReqdto) {
        return healthLogMapper.createHealthLog(createReqdto);
    }

    // 3. 기존 healthlog 수정
    @Transactional
    public int updateHealthLog(HealthLogUpdateReqDto updateReqDto) {
        return healthLogMapper.updateHealthLog(updateReqDto);
    }

    // 4. 주간 평균 비교
    public HealthWeeklyComparisonDto getWeeklyAverage(int petId) {
        LocalDate today = LocalDate.now();

        // 이번 주
        LocalDate thisWeekStart = today.minusDays(6);
        LocalDate thisWeekEnd = today;

        // 지난 주
        LocalDate lastWeekStart = today.minusDays(13);
        LocalDate lastWeekEnd = today.minusDays(7);

        // 4. 매퍼를 두 번 호출하여 각각의 평균 데이터 조회
        // MyBatis 쿼리에서 AVG()를 사용해 7일치 평균을 1줄로 가져옴
        HealthWeeklyAvgDto thisWeekAvg = healthLogMapper.getWeeklyAverage(petId, thisWeekStart, thisWeekEnd);
        HealthWeeklyAvgDto lastWeekAvg = healthLogMapper.getWeeklyAverage(petId, lastWeekStart, lastWeekEnd);

        // 5. 조회 결과가 null일 경우를 대비해 기본 객체 생성 (데이터 없을 경우 방지)
        if (thisWeekAvg == null) thisWeekAvg = new HealthWeeklyAvgDto();
        if (lastWeekAvg == null) lastWeekAvg = new HealthWeeklyAvgDto();

        // 비교 데이터 조립 - 최종 응답 DTO
        return HealthWeeklyComparisonDto.builder()
                .thisWeek(thisWeekAvg)
                .lastWeek(lastWeekAvg)
                .build();
    }


}
