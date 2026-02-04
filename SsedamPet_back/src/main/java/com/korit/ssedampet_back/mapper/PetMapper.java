package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.dto.request.PetAddReqDto;
import com.korit.ssedampet_back.dto.request.PetCreateReqDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PetMapper {

    // 가입 시 펫 정보 입력
    int addPet(PetCreateReqDto dto);

    // 마이페이지 내 펫 정보 추가
    int insertPet(PetAddReqDto dto);
}


