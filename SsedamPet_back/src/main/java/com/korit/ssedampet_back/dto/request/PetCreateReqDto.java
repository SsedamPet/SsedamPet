package com.korit.ssedampet_back.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PetCreateReqDto {

    private int userId;
    private String petType;
    private String petName;
    private LocalDate petBirth;
    private String petGender;
    private String petBreed;
    private Double petWeight;
    private String petProfileImgUrl;


}

