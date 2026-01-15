package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.response.healthlog.HealthLogRespDto;
import com.korit.ssedampet_back.mapper.HealthLogMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class HealthLogService {

    private final HealthLogMapper healthLogMapper;

    public HealthLogRespDto getTodayLog(int petId, LocalDate writeDate) {
        return healthLogMapper.findByPetIdAndDate(petId, writeDate);
    }
}
