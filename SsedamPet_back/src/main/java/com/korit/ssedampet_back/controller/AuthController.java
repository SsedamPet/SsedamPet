package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.request.SignupReqDto;
import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.jwt.JwtTokenProvider;
import com.korit.ssedampet_back.service.AuthService;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> signup(@ModelAttribute SignupReqDto signupReqDto) {
        User user = authService.signup(signupReqDto);

        String accessToken = jwtTokenProvider.createAccessToken(user.getUserId());
        System.out.println(signupReqDto);

        return ResponseEntity.ok(accessToken);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {

        // SecurityContext 제거 (인증 정보 삭제)
        SecurityContextHolder.clearContext();

        //] 세션 무효화 (OAuth2 로그인 과정에서 생성될 수 있음)
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // JSESSIONID 쿠키 삭제 (브라우저에 남아있으면 계정 전환이 꼬일 수 있음)
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);

        // refresh token을 DB/Redis에 저장하고 있다면 여기서 같이 제거
        // authService.invalidateRefreshToken(me());

        return ResponseEntity.ok().body("ok");
    }

    @GetMapping("/valid/nickname")
    public ResponseEntity<?> validationNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(authService.isValidNickname(nickname));
    }
}
