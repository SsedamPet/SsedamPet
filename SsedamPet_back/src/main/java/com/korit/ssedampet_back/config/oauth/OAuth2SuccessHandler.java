package com.korit.ssedampet_back.config.oauth;

import com.korit.ssedampet_back.mapper.UserMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserMapper userMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String provider = extractProvider(authentication);
        String providerId = extractProviderId(provider, attributes);

        int count = userMapper.existsByProviderAndProviderId(provider, providerId);
        boolean isExist = count > 0;

        if (isExist) {
            getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000/main");
        } else {
            String email = (String) attributes.get("email");
            getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000/register?email=" + email + "&provider=" + provider + "&providerId=" + providerId);
        }
    }

    private String extractProvider(Authentication authentication) {
        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        return authToken.getAuthorizedClientRegistrationId();
    }

    private String extractProviderId(String provider, Map<String, Object> attributes) {
        if (provider.equals("kakao")) return String.valueOf(attributes.get("id"));
        if (provider.equals("naver")) return (String) ((Map) attributes.get("response")).get("id");
        return (String) attributes.get("sub"); // google
    }
}