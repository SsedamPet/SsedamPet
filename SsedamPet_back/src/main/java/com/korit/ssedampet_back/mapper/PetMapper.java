package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.dto.request.CreatePetReqDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PetMapper {
    int insertPet(CreatePetReqDto dto);
}
