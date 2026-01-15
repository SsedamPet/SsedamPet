package com.korit.ssedampet_back.dto.response.mypage;

import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PetDto {
    private int petId;                   // pet_tb.pet_id
    private String petName;               // pet_tb.pet_name
    private String petGender;             // pet_tb.pet_gender ("M","F")
    private String petProfileImgUrl;      // pet_tb.pet_profile_img_url
}
