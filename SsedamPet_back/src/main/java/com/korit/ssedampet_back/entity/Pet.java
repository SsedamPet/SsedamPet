package com.korit.ssedampet_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pet {
    private int petId;
    private int userId;

    public enum PetType { DOG, CAT }
    public enum PetGender { M, F }

    private PetType petType;
    private String petName;
    private LocalDate petBirth;
    private PetGender petGender;
    private String petBreed;
    private Double petWeight;
    private String petProfileImgUrl;
    private int petAge;

    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;

}
