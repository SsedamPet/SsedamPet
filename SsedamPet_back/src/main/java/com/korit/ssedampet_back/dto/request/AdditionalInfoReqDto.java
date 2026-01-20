package com.korit.ssedampet_back.dto.request;

import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;

@Data
public class AdditionalInfoReqDto {
    // 유저 정보 (추가 정보 입력 페이지에서 받는 것들)
    private int userId;
    private String displayNickname;
    private LocalDate userBirth; // "2024-01-20" 형태로 받음
    private String phone;
    private String userProfileImgUrl;

    // 반려동물 관련 정보
    private String petName;
    private String petType;
    private String petBreed;
    private LocalDate petBirth;
    private String petGender;
    private Double petWeight;
    private String petProfileImgUrl;


}
