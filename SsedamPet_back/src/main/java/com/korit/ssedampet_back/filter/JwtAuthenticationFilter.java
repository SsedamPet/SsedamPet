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
        System.out.println("보안 필터 가동 중: " + request.getRequestURI());
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("필터 동작!!!");

        String bearerToken = request.getHeader("Authorization");
        if (bearerToken == null || !bearerToken.startsWith("Bearer ")) {        //토큰 없거나 Bearer 형식 아니면
            String uri = request.getRequestURI();

            if ("/api/notices/stream".equals(uri)) {
                String queryToken = request.getParameter("token");
                if (queryToken != null && !queryToken.isBlank()) {
                    if (queryToken.startsWith("Bearer ")) {
                        queryToken = queryToken.replaceFirst("Bearer\\s+", "");
                    }

                    String accessToken = queryToken;
                    if (!jwtTokenProvider.validateToken(accessToken)) {
                        filterChain.doFilter(request, response);
                        return;
                    }

                    int userId = jwtTokenProvider.getUserId(accessToken);
                    User foundUser = userMapper.findByUserId(userId);
                    if (foundUser == null) {
                        filterChain.doFilter(request, response);
                        return;
                    }

                    Map<String, Object> attributes = Map.of(
                            "name", foundUser.getName(),
                            "userId", foundUser.getUserId()
                    );

                    Collection<? extends GrantedAuthority> authorities =
                            List.of(new SimpleGrantedAuthority("ROLE_USER"));
                    PrincipalUser principalUser =
                            new PrincipalUser(authorities, attributes, "name", foundUser);

                    Authentication authentication =
                            new UsernamePasswordAuthenticationToken(
                                    principalUser,
                                    null,
                                    principalUser.getAuthorities()
                            );
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    filterChain.doFilter(request, response);
                    return;

                }
            }
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
        if (foundUser == null) {
            filterChain.doFilter(request, response); // 유저 없으면 그냥 통과(인증 안됨 처리)
            return;
        }

        Map<String, Object> attributes = Map.of(
                "name", foundUser.getName(), // "name"이라는 열쇠로 실제 이름을 담음
                "userId", foundUser.getUserId()
        );


        Collection<? extends GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        PrincipalUser principalUser = new PrincipalUser(authorities, attributes, "name", foundUser);

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
