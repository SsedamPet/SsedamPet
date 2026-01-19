package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.PetRequestDto;
import com.korit.ssedampet_back.entity.PetEntity;
import com.korit.ssedampet_back.mapper.PetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor // final 필드 자동 주입
public class PetService {

    private final PetMapper petMapper;

    public void registerPet(PetRequestDto dto) {

        PetEntity pet = PetEntity.builder()
                .userid(dto.getUserid())
                .pettype(PetEntity.PetType.valueOf(dto.getPettype().toUpperCase()))
                .petname(dto.getPetname())
                .petbirth(dto.getPetbirth().atStartOfDay())
                .petgender(PetEntity.PetGender.valueOf(dto.getPetgender().toUpperCase()))
                .petbreed(dto.getPetbreed())
                .petweight(dto.getPetweight())
                .pet_profile_img_url(dto.getPet_profile_img_url() == null ? "default_pet.png" : dto.getPet_profile_img_url())
                .build();

        petMapper.savePet(pet);
    }
}