package com.korit.ssedampet_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OAuth2UserEntity {
    private int oauth2UserId;
    private int userId;

    private Provider provider;
    private String providerUserId;

    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;

    // ===== ENUM =====
    public enum Provider {
        GOOGLE,
        NAVER,
        KAKAO
    }

}
