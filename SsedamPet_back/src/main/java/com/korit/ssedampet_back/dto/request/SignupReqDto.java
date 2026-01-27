package com.korit.ssedampet_back.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
public class SignupReqDto {
    //소셜 로그인 직후 백엔드로 넘어오는 최소 정
    private String email;
    private String name;
    private String birthDate;
    private String phone;
    private String nickname;
    private MultipartFile profileImgFile;
    private String provider;
    private String providerUserId;
}