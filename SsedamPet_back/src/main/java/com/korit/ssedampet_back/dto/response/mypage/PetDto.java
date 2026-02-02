package com.korit.ssedampet_back.dto.response.mypage;

import lombok.*;

import java.time.LocalDate;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PetDto {
    private int petId;                   // pet_tb.pet_id
    private int userId;
    private String petType;
    private String petName;               // pet_tb.pet_name
    private LocalDate petBirth;
    private String petGender;             // pet_tb.pet_gender ("M","F")
    private String petBreed;
    private Double petWeight;
    private String petProfileImgUrl;      // pet_tb.pet_profile_img_url
    private int petAge;          // SQL에서 계산해서 담아줄 나이


}
