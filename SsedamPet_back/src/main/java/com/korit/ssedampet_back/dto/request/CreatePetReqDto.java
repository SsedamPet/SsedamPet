package com.korit.ssedampet_back.dto.request;

import lombok.Data;

@Data
public class CreatePetReqDto {

    private Integer petId;              // useGeneratedKey로 여기에 자동 주입
    private Integer userId;             // insert에 필요한 userId

    private String petType;            // "DOG" / "CAT"
    private String petName;
    private String petBreed;
    private String petBirth;           // "YYYY-MM-DD"
    private String petGender;          // "M" / "F"
    private Double petWeight;
    private String petProfileImgUrl;   // URL 방식
}
