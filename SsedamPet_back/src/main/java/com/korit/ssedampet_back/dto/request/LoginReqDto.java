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
public class LoginReqDto {

    //소셜 로그인 직후 백엔드로 넘어오는 최소 정

    private String email;
    private String name;
    private String userProfileImgUrl;
    private String provider;
    private String providerUserId;

}