package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.HealthLogCreateReqDto;
import com.korit.ssedampet_back.dto.request.HealthLogUpdateReqDto;
import com.korit.ssedampet_back.dto.response.healthlog.HealthLogRespDto;
import com.korit.ssedampet_back.mapper.HealthLogMapper;
import lombok.RequiredArgsConstructor;
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


}
