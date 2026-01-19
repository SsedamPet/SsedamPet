package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.OAuth2UserInfoDto;
import com.korit.ssedampet_back.entity.OAuth2UserEntity;
import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.mapper.OAuth2UserMapper;
import com.korit.ssedampet_back.mapper.UserMapper;
import com.korit.ssedampet_back.security.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2Service extends DefaultOAuth2UserService {

    private final UserMapper userMapper;
    private final OAuth2UserMapper oAuth2UserMapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);  //attributes(provider 원본응답), authorities
        String provider = userRequest.getClientRegistration().getClientName();
        System.out.println(userRequest.getClientRegistration().getClientName());

        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = null;
        String providerUserId = null;
        String profileImgUrl = null; // 이미지 추가
        String name = null;

        switch (provider) {
            case "GOOGLE":
                providerUserId = attributes.get("sub").toString();
                email = (String) attributes.get("email");
                profileImgUrl = (String) attributes.get("picture");
                name = (String) attributes.get("name");
                break;
            case "NAVER":
                Map<String, Object> response = (Map<String, Object>) attributes.get("response");
                providerUserId = response.get("id").toString();
                email = (String) response.get("email");
                profileImgUrl = (String) response.get("profile_image");
                name = (String) response.get("name");
                break;
            case "KAKAO":
                Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
                Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
                providerUserId = attributes.get("id").toString();
                email = (String) kakaoAccount.get("email");
                profileImgUrl = (String) profile.get("profile_image_url");
                name = (String) profile.get("nickname");
                break;
        }

        // SuccessHandler에서 꺼내 쓰기 좋게 규격화된 Map 생성
        Map<String, Object> newAttributes = Map.of(
                "providerUserId", providerUserId,
                "provider", provider,
                "email", email,
                "profileImgUrl", profileImgUrl, // 이미지 포함
                "name", name
        );

        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));

        return new DefaultOAuth2User(authorities, newAttributes, "providerUserId");

        //  oauth2_user_tb에서 (provider + providerUserId)로 기존 매핑 조회

    }
}



