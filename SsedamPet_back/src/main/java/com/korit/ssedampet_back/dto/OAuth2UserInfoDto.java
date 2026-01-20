package com.korit.ssedampet_back.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OAuth2UserInfoDto {
    private String email;
    private String name;
    private String profileImgUrl;
    private String provider;
    private String providerUserId;
}
