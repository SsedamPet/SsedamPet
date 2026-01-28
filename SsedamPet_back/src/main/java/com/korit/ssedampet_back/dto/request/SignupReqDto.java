package com.korit.ssedampet_back.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
public class SignupReqDto {
    //회원정보 추가입력 폼 - 회원가입
    private String email;
    private String name;
    private String birthDate;
    private String phone;
    private String nickname;
    private String profileImgUrl;
    private MultipartFile profileImgFile;
    private String provider;
    private String providerUserId;
}