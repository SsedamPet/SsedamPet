package com.korit.ssedampet_back.dto.response.main;

import lombok.Data;

@Data
public class PetListDto {
    private int petId;
    private String petName;
    private String petGender;
    private String petProfileImgUrl;
    private String petBirth;
    private int petAge;          // SQL에서 계산해서 담아줄 나이
}
