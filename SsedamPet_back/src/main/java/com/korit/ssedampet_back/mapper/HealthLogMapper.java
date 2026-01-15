package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.dto.response.healthlog.HealthLogRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;


@Mapper
public interface HealthLogMapper {

    HealthLogRespDto findByPetIdAndDate (
            @Param("petId") int petId,
            @Param("writeDate") LocalDate writeDate
            );
}
