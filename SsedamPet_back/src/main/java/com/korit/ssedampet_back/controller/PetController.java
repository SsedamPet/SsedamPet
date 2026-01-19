package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.request.PetRequestDto;
import com.korit.ssedampet_back.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pet") // 요청 주소 설정
@RequiredArgsConstructor
public class PetController {

    private final PetService petService;

    @PostMapping("/register") // 반려동물 등록 API
    public ResponseEntity<String> registerPet(@RequestBody PetRequestDto dto) {
        petService.registerPet(dto);

        return ResponseEntity.ok("반려동물이 등록되었습니다.");
    }
}