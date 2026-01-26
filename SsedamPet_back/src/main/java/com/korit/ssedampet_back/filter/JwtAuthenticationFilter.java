package com.korit.ssedampet_back.filter;

import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.jwt.JwtTokenProvider;
import com.korit.ssedampet_back.mapper.UserMapper;
import com.korit.ssedampet_back.security.PrincipalUser;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("필터 동작!!!");

        String bearerToken = request.getHeader("Authorization");
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {        //토큰 없거나 Bearer 형식 아니면
            filterChain.doFilter(request, response);   // 다음 filter로 넘겨버림 - 인증되지않은 상태
            return;

        }
        System.out.println("1. 토큰 추출");
        String accessToken = bearerToken.replaceAll("Bearer ", "");

        System.out.println("검증 시작...");

        // 토큰 유효X
        if (!jwtTokenProvider.validateToken(accessToken)) {
            filterChain.doFilter(request, response);
            return;
        }
        System.out.println("검증 결과: 성공");

        //userId 추출
        System.out.println("2. userId추출");

        int userId = jwtTokenProvider.getUserId(accessToken);
        System.out.println("토큰 내 userId: " + userId);


        //===================================================================
        //PrincipalUser
        //principalUser, password, authorities
        //TODO: UserMapper 내 foundUser 구현

        User foundUser = userMapper.findByUserId(userId);

        Map<String, Object> attributes = Map.of(
                "username", foundUser.getUsername(), // "username"이라는 열쇠로 실제 이름을 담음
                "userId", foundUser.getUserId()
        );


        Collection<? extends GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        PrincipalUser principalUser = new PrincipalUser(authorities, attributes, "username", foundUser);

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        principalUser,
                        null,
                        principalUser.getAuthorities()
                );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        filterChain.doFilter(request, response);
    }
}
