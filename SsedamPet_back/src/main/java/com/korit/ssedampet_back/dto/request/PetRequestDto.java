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
public class PetRequestDto {

    private int userid;
    private String pettype;
    private String petname;
    private LocalDate petbirth;
    private String petgender;
    private String petbreed;
    private float petweight;
    private String pet_profile_img_url;
}