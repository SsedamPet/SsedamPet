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

import java.util.*;

@Service
@RequiredArgsConstructor
public class OAuth2Service extends DefaultOAuth2UserService {

    private final UserMapper userMapper;
    private final OAuth2UserMapper oAuth2UserMapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);  //attributes(provider 원본응답), authorities


        String provider = userRequest.getClientRegistration().getRegistrationId().toUpperCase();
        System.out.println(provider);

        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = null;
        String providerUserId = null;
        String profileImgUrl = null; // 이미지 추가
        String name = null;

        System.out.println("로그인 시도 provider: " + provider);

        switch (provider) {
            case "GOOGLE":
                providerUserId = attributes.get("sub") != null ? attributes.get("sub").toString() : (String) attributes.get("id");
                email = (String) attributes.get("email");
                profileImgUrl = (String) attributes.get("picture");
                name = (attributes.get("name") != null) ? attributes.get("name").toString() : "구글 유저";
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

        // SuccessHandler에서 꺼내 쓰기 좋게 통합 Map 생성
        Map<String, Object> newAttributes = new HashMap<>();
        newAttributes.put("providerUserId", providerUserId);
        newAttributes.put("provider", provider);
        newAttributes.put("email", email);
        newAttributes.put("profileImgUrl", profileImgUrl);
        newAttributes.put("nickname", name);

        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));

        // 여기 user는 DB에서 조회/생성된 User로 넣어야 안정적
        return new PrincipalUser(authorities, newAttributes, "providerUserId", null);
    }
}



