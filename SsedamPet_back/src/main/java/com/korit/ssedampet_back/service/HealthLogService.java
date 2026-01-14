package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.response.HealthLogRespDto;
import com.korit.ssedampet_back.mapper.HealthLogMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class HealthLogService {

    private final HealthLogMapper healthLogMapper;

    public HealthLogRespDto getTodayLog(int petId, LocalDate writeDate) {
        return healthLogMapper.findByPetIdAndDate(petId, writeDate);
    }
}
