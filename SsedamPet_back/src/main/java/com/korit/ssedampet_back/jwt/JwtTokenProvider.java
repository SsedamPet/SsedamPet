package com.korit.ssedampet_back.jwt;

import com.korit.ssedampet_back.entity.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    //비밀키
    private final SecretKey key;

    //
    //${jwt.secret} : application.yml 에 있는 비밀키
    public JwtTokenProvider(@Value("${jwt.secret:default_secret_key_1234567890_abcdefg}")String secret) {
        key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // 토큰 만들기
    public String createAccessToken(User user) {
        Date now = new Date();
        long expiredTime = now.getTime() + (1000L * 60L * 60L * 24L);  //1일
        Date expiredDate = new Date(expiredTime);

        return Jwts.builder()
                .subject("Server access token")
                .issuer("ssedampet")
                .issuedAt(now)                 //토큰 발급 시간
                .expiration(expiredDate)              //토큰 만료시간
                .claim("userId", user.getUserId())   // 유저id 가 몇번인지
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 토큰 만들기 (userId만)
    public String createAccessToken(int userId) {
        Date now = new Date();
        long expiredTime = now.getTime() + (1000L * 60L * 60L * 24L);  // 1일
        Date expiredDate = new Date(expiredTime);

        return Jwts.builder()
                .subject("Server access token")
                .issuer("ssedampet")
                .issuedAt(now)
                .expiration(expiredDate)
                .claim("userId", userId)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // validateToken - 토큰 검증
    public boolean validateToken(String token) {
        Claims claims = null;

        try {
            JwtParser jwtParser = Jwts.parser()
                    .setSigningKey(key)
                    .build();

            jwtParser.parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
            // 토큰이 위변조되었거나, 만료되었거나, 형식 오류가 있을 경우 예외발생
        }
    }

    // getUserId
    public int getUserId(String token) {
        return (int) Jwts.parser()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getPayload()
                .get("userId");
    }
}
