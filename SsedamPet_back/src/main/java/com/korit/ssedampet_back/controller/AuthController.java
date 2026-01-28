package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.request.SignupReqDto;
import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.jwt.JwtTokenProvider;
import com.korit.ssedampet_back.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/valid/nickname")
    public ResponseEntity<?> validationNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(authService.isValidNickname(nickname));
    }
}
