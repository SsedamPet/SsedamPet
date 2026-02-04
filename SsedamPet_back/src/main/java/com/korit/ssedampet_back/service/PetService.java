package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.PetCreateReqDto;
import com.korit.ssedampet_back.entity.Pet;
import com.korit.ssedampet_back.mapper.PetMapper;
import com.korit.ssedampet_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor // final 필드 자동 주입
public class PetService {

    private final UserMapper userMapper;
    private final PetMapper petMapper;

    public void registerPet(PetCreateReqDto dto) {

        PetCreateReqDto pet = PetCreateReqDto.builder()
                .userId(dto.getUserId())
                .petType(String.valueOf(Pet.PetType.valueOf(dto.getPetType().toUpperCase())))
                .petName(dto.getPetName())
                .petBirth(dto.getPetBirth())
                .petGender(dto.getPetGender().toUpperCase())
                .petBreed(dto.getPetBreed())
                .petWeight(dto.getPetWeight())
                .petProfileImgUrl(dto.getPetProfileImgUrl() == null ? "default_pet.png" : dto.getPetProfileImgUrl())
                .build();


        petMapper.addPet(pet);
    }
}