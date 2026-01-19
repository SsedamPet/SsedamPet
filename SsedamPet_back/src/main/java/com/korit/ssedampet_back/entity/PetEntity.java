package com.korit.ssedampet_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PetEntity {

    public enum PetType { DOG, CAT }
    public enum PetGender { M, F }

    private int petid;
    private int userid;
    private int postid;
    private PetType pettype;
    private String petname;
    private LocalDateTime petbirth;
    private PetGender petgender;
    private String petbreed;
    private float petweight;
    private String pet_profile_img_url;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;

}
