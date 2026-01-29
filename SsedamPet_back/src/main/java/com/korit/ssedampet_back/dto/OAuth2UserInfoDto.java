package com.korit.ssedampet_back.dto;

import com.korit.ssedampet_back.entity.OAuth2UserEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class OAuth2UserInfoDto {
    private int userId;
    private String name;
    private String email;
    private LocalDateTime birthDate;
    private String phone;
    private String nickname;
    private String userProfileImgUrl;
    private LocalDateTime lastLoginDt;
    private int oauth2UserId;
    private Provider provider;

    public enum Provider {
        GOOGLE,
        NAVER,
        KAKAO
    }
    private String providerUserId;
}
