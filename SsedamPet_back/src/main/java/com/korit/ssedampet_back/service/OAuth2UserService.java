package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.config.oauth.OAuthAttributes;
import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UserMapper userMapper;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();

        String userNameAttributeName = userRequest
                .getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(provider, userNameAttributeName, oAuth2User.getAttributes());

        saveOrUpdate(attributes);

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                attributes.getAttributes(),
                attributes.getNameAttributeKey()
        );
    }

    private void saveOrUpdate(OAuthAttributes attributes) {

        int count = userMapper.existsByProviderAndProviderId(attributes.getProvider(), attributes.getProviderId());

        User user = User.builder()
                .username(attributes.getName())
                .email(attributes.getEmail())
                .userProfileImgUrl(attributes.getPicture())
                .userBirth(LocalDateTime.of(1900, 1, 1, 0, 0))
                .phone("010-0000-0000")
                .displayUsername(attributes.getName())
                .build();

        try {
            userMapper.saveUser(user);
            System.out.println("✅ DB 저장 성공: " + attributes.getEmail());
        } catch (Exception e) {
            System.out.println("❌ DB 저장 실패: " + e.getMessage());
            e.printStackTrace(); // 에러 원인이 콘솔에 찍힙니다.
        }

        userMapper.saveUser(user);
    }
}