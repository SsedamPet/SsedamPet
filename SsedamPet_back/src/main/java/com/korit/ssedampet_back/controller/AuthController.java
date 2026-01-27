package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.request.SignupReqDto;
import com.korit.ssedampet_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping(value = "/signup", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> signup(@ModelAttribute SignupReqDto signupReqDto) {
        System.out.println(signupReqDto);

        return ResponseEntity.ok(null);
    }

    @GetMapping("/valid/nickname")
    public ResponseEntity<?> validationNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.isValidNickname(nickname));
    }
}
