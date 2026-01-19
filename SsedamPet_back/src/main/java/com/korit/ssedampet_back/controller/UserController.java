package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.request.UserRequestDto;
import com.korit.ssedampet_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRequestDto dto) {
        userService.registerUser(dto);

        return ResponseEntity.ok("사용자 등록이 완료되었습니다.");
    }
}