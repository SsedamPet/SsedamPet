package com.korit.ssedampet_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.DecimalFormat;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pet {
    private int petId;
    private int userId;
    public enum PetType {
        DOG, CAT
    }
    private String petName;
    private LocalDateTime petBirth;
    private enum petGender {
        M, F
    }
    private String petBreed;
    private DecimalFormat petWeight;
    private String petProfileImgUrl;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;

}
