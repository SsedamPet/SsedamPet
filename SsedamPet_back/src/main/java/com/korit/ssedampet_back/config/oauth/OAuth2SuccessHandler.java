package com.korit.ssedampet_back.config.oauth;

import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.jwt.JwtTokenProvider;
import com.korit.ssedampet_back.mapper.OAuth2UserMapper;
import com.korit.ssedampet_back.mapper.UserMapper;
import com.korit.ssedampet_back.security.PrincipalUser;
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
    private final OAuth2UserMapper oAuth2UserMapper;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

//        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        Map<String, Object> attributes = principalUser.getAttributes();

        User user = principalUser.getUser();

        String accessToken = jwtTokenProvider.createAccessToken(user.getUserId());

        String email = (String) attributes.get("email");
        String provider = (String) attributes.get("provider");
        String providerUserId = (String) attributes.get("providerUserId");
        String profileImgUrl = (String) attributes.get("profileImgUrl");
        String name = (String) attributes.get("name");

        System.out.println("provider = " + provider);

        boolean needAdditionalInfo = user.getPhone() == null || user.getUserBirth() == null;

        String targetUrl = needAdditionalInfo
                ? "http://localhost:5173/auth/signup/details?accessToken=" + accessToken
                : "http://localhost:5173/auth/oauth2/success?accessToken=" + accessToken;

//        // 기존 가입 여부 확인
//        User existingUser = oAuth2UserMapper.findUserByOAuth2Info(provider, providerUserId);
//        String targetUrl;
//
//        if (existingUser == null) {
//            // 신규 유저- 깡통 계정 생성
//            User newUser = userService.registerUser(email, name, profileImgUrl, provider, providerUserId);
//            accessToken = jwtTokenProvider.createAccessToken(newUser);
//
//            // 추가 정보 입력 페이지로 리다이렉트 (이미지 URL도 같이 보냄)
//            targetUrl = "http://localhost:5173/signup/details?accessToken=" + accessToken
//                    + "&profileImg=" + profileImgUrl;
//        } else {
//            // 기존 유저: 로그인 처리
//            accessToken = jwtTokenProvider.createAccessToken(existingUser);
//            targetUrl = "http://localhost:5173/auth/oauth2/success?accessToken=" + accessToken;
//        }

        System.out.println("발급된 서버 JWT 토큰: " + accessToken);

        response.sendRedirect(targetUrl);
    }
}