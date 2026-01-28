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

        OAuth2UserEntity oAuth2UserEntity = oAuth2UserMapper.findByProviderAndProviderUserId(attributes.get("provider").toString(), attributes.get("providerUserId").toString());

        if (Objects.isNull(oAuth2UserEntity)) {
            List<String> params = attributes.entrySet().stream().map(stringObjectEntry -> {
                StringBuilder stringBuilder = new StringBuilder();
                stringBuilder.append(stringObjectEntry.getKey());
                stringBuilder.append("=");
                stringBuilder.append(stringObjectEntry.getKey().equals("nickname") ? URLEncoder.encode(stringObjectEntry.getValue().toString()) : stringObjectEntry.getValue());
                stringBuilder.append("&");
                return stringBuilder.toString();
            }).toList();

            String paramsString = String.join("", params);
            paramsString = paramsString.substring(0, paramsString.length() - 1);

            response.sendRedirect("http://localhost:5173/auth/signup/oauth2?" + paramsString);
            return;
        }

        String accessToken = jwtTokenProvider.createAccessToken(oAuth2UserEntity.getUserId());
        response.sendRedirect("http://localhost:5173/auth/login/oauth2/success?accessToken=" + accessToken);

    }
}