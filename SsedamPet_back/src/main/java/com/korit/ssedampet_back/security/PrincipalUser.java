package com.korit.ssedampet_back.security;

import com.korit.ssedampet_back.entity.User;
import lombok.Getter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Getter
public class PrincipalUser extends DefaultOAuth2User {
    private User user;

    public PrincipalUser(Collection<? extends GrantedAuthority> authorities,
                         Map<String, Object> attributes,
                         String nameAttributeKey,
                         User user) {

        super(authorities,
                (attributes == null || attributes.isEmpty())
                        ? defaultAttributes(user)
                        : attributes,
                nameAttributeKey);

        this.user = user;
    }

    private static Map<String, Object> defaultAttributes(User user) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", user.getUserId());          // 최소 1개 필수
        map.put("username", user.getUsername());
        return map;
    }

    public static PrincipalUser getAuthenticatedPrincipalUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) return null;

        Object principal = authentication.getPrincipal();
        if (principal instanceof PrincipalUser pu) return pu;

        return null;
    }
}
