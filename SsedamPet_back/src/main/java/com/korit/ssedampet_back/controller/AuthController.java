package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.request.PetCreateReqDto;
import com.korit.ssedampet_back.dto.request.LoginReqDto;
import com.korit.ssedampet_back.service.PetService;
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
public class AuthController {

    private final UserService userService;
    private final PetService petService;

    // 최초 유저 추가정보 입력
    @PostMapping("/additional-info")
    public ResponseEntity<String> registerUser(@RequestBody LoginReqDto dto) {
        userService.registerUser(dto);

        return ResponseEntity.ok("사용자 등록이 완료되었습니다.");
    }

    // 가입 시 최초 펫 정보 등록
    @PostMapping("/pet-info")
    public ResponseEntity<String> registerPet(@RequestBody PetCreateReqDto dto) {
        petService.registerPet(dto);

        return ResponseEntity.ok("반려동물이 등록되었습니다.");
    }



}