package com.korit.ssedampet_back.config.oauth;

import com.korit.ssedampet_back.entity.OAuth2UserEntity;
import com.korit.ssedampet_back.jwt.JwtTokenProvider;
import com.korit.ssedampet_back.mapper.OAuth2UserMapper;
import com.korit.ssedampet_back.security.PrincipalUser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final OAuth2UserMapper oAuth2UserMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        Map<String, Object> attributes = principalUser.getAttributes();

        String provider = attributes.get("provider").toString();
        String providerUserId = attributes.get("providerUserId").toString();

        OAuth2UserEntity oAuth2UserEntity = oAuth2UserMapper.findByProviderAndProviderUserId(attributes.get("provider").toString(), attributes.get("providerUserId").toString());

        if (Objects.isNull(oAuth2UserEntity)) {

            String name = Objects.toString(attributes.get("name"), "소셜유저");
            String email = Objects.toString(attributes.get("email"), "");
            String profileImgUrl = Objects.toString(attributes.get("profileImgUrl"), "");

            StringBuilder sb = new StringBuilder("http://localhost:5173/auth/signup/oauth2?");
            sb.append("provider=").append(provider)
                    .append("&providerUserId=").append(providerUserId)
                    .append("&email=").append(email)
                    // 한글 이름이나 특수문자가 섞인 URL은 반드시 인코딩
                    .append("&name=").append(URLEncoder.encode(name, StandardCharsets.UTF_8))
                    .append("&profileImgUrl=").append(URLEncoder.encode(profileImgUrl, StandardCharsets.UTF_8));

            response.sendRedirect(sb.toString());
        } else {
            String accessToken = jwtTokenProvider.createAccessToken(oAuth2UserEntity.getUserId());
            response.sendRedirect("http://localhost:5173/auth/login/oauth2/success?accessToken=" + accessToken);
        }



    }
}