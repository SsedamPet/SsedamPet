package com.korit.ssedampet_back.config;

import com.korit.ssedampet_back.config.oauth.OAuth2SuccessHandler;
import com.korit.ssedampet_back.filter.JwtAuthenticationFilter;
import com.korit.ssedampet_back.security.JwtAuthenticationEntryPoint;
import com.korit.ssedampet_back.service.OAuth2Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

//    @Value("${app.cors.allowed-origins}")
    @Value("${app.cors.allowed-origins:http://localhost:5173}")
    private String allowedOrigins;


    @Bean
    public SecurityFilterChain FilterChain(HttpSecurity http, OAuth2SuccessHandler oAuth2SuccessHandler, OAuth2Service oAuth2Service) throws Exception {

        // CrossOrigin 적용
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        // 세션 비활성화(무상태)
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // http 기본 로그인 비활성화
        http.httpBasic(httpBasic -> httpBasic.disable());

        //form 로그인 비활성화
        http.formLogin(formLogin -> formLogin.disable());

        http.csrf(csrf -> csrf.disable());

        //TODO: Oauth2 로그인 설정
        http.oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo.userService(oAuth2Service)) // 소셜 유저 정보 처리 서비스 등록
                .successHandler(oAuth2SuccessHandler) // 로그인 성공 후 로직 처리 핸들러 등록
        );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        http.authorizeHttpRequests(auth -> {
            // 모든 사용자 접근 (인증/공개 API)
            auth.requestMatchers("/api/auth/**").permitAll();
            auth.requestMatchers("/v3/api-docs/**").permitAll();
            auth.requestMatchers("/swagger-ui/**").permitAll();
            auth.requestMatchers("/swagger-ui.html").permitAll();
            auth.requestMatchers("/doc").permitAll();
            auth.requestMatchers("/image/**").permitAll();

            auth.requestMatchers("/oauth2/**").permitAll();
            auth.requestMatchers("/login/**").permitAll();
            auth.requestMatchers("/api/user/**").permitAll();
            auth.requestMatchers("/api/users/**").permitAll();
            auth.requestMatchers("/api/main/**").permitAll();
            auth.requestMatchers("/api/healthlog").permitAll();
            auth.requestMatchers("/api/healthlog/**").permitAll();
            auth.requestMatchers("/api/mypage/**").permitAll();
            auth.requestMatchers("/api/posts/**").permitAll();
            auth.requestMatchers("/ai/**").permitAll();
            auth.requestMatchers("/api/notices/**").authenticated();
            auth.requestMatchers("/api/community/**").authenticated();
            //auth.requestMatchers("/api/community/**").permitAll();


            auth.anyRequest().authenticated();
        });

        http.exceptionHandling(exception ->
                exception.authenticationEntryPoint(jwtAuthenticationEntryPoint));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cors = new CorsConfiguration();

        cors.setAllowedOrigins(List.of(allowedOrigins.split("\\s*,\\s*")));
        cors.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        cors.setAllowedHeaders(List.of("*"));
        cors.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);
        return source;
    }


}
