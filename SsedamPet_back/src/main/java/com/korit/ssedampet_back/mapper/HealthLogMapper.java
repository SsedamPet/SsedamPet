package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.dto.request.HealthLogCreateReqDto;
import com.korit.ssedampet_back.dto.request.HealthLogUpdateReqDto;
import com.korit.ssedampet_back.dto.response.healthlog.HealthLogRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;


@Mapper
public interface HealthLogMapper {

    // 1. HealthLog 조회 - GET
    HealthLogRespDto findByPetIdAndDate (
            @Param("petId") int petId,
            @Param("writeDate") LocalDate writeDate
            );

    // 2. 새 HealthLog 작성 - POST
    int createHealthLog(HealthLogCreateReqDto healthLogCreateReqDto);

    // 3. 기존 HealthLog 수정 - PATCH
    int updateHealthLog(HealthLogUpdateReqDto healthLogUpdateReqDto);
}
