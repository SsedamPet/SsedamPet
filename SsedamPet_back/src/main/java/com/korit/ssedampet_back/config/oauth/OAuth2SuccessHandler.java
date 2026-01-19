package com.korit.ssedampet_back.config.oauth;

import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.jwt.JwtTokenProvider;
import com.korit.ssedampet_back.mapper.OAuth2UserMapper;
import com.korit.ssedampet_back.mapper.UserMapper;
import com.korit.ssedampet_back.service.OAuth2Service;
import com.korit.ssedampet_back.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;
    private final OAuth2Service oAuth2Service;
    private final OAuth2UserMapper oAuth2UserMapper;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        // 1. 표준화된 DefaultOAuth2User로 캐스팅 (Map 표준화 방식을 썼을 때)
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oauth2User.getAttributes();

        // 2. 표준 키값으로 정보 추출
        String email = (String) attributes.get("email");
        String provider = (String) attributes.get("provider");
        String providerUserId = (String) attributes.get("providerUserId");
        String profileImgUrl = (String) attributes.get("profileImgUrl");
        String name = (String) attributes.get("name");

        // 3. 기존 가입 여부 확인 (Join 쿼리 사용)
        User existingUser = oAuth2UserMapper.findUserByOAuth2Info(provider, providerUserId);

        String accessToken;
        String targetUrl;

        if (existingUser == null) {
            // 4. 신규 유저- 깡통 계정 생성 (이미지 포함)
            User newUser = userService.registerUser(email, name, profileImgUrl, provider, providerUserId);
            accessToken = jwtTokenProvider.createAccessToken(newUser);

            // 추가 정보 입력 페이지로 리다이렉트 (이미지 URL도 같이 보냄)
            targetUrl = "http://localhost:5173/signup/details?accessToken=" + accessToken
                    + "&profileImg=" + profileImgUrl;
        } else {
            // 5. 기존 유저: 로그인 처리
            accessToken = jwtTokenProvider.createAccessToken(existingUser);
            targetUrl = "http://localhost:5173/auth/oauth2/success?accessToken=" + accessToken;
        }
        System.out.println("발급된 서버 JWT 토큰: " + accessToken);

        response.sendRedirect(targetUrl);
    }
}