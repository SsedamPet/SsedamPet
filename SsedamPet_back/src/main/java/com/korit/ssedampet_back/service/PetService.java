package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.PetCreateReqDto;
import com.korit.ssedampet_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor // final 필드 자동 주입
public class PetService {

    private final UserMapper userMapper;

    public void registerPet(PetCreateReqDto dto) {

        PetCreateReqDto pet = dto.builder()
                .userid(dto.getUserid())
                .petType(dto.getPetType().valueOf(dto.getPetType().toUpperCase()))
                .petName(dto.getPetName())
                .petBirth(dto.getPetBirth())
                .petGender(dto.getPetGender().valueOf(dto.getPetGender().toUpperCase()))
                .petBreed(dto.getPetBreed())
                .petWeight(dto.getPetWeight())
                .petProfileImgUrl(dto.getPetProfileImgUrl() == null ? "default_pet.png" : dto.getPetProfileImgUrl())
                .build();

        userMapper.savePet(dto);
    }
}