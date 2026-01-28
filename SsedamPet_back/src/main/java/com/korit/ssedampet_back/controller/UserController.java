package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.request.AdditionalInfoReqDto;
import com.korit.ssedampet_back.dto.request.PetCreateReqDto;
import com.korit.ssedampet_back.security.PrincipalUser;
import com.korit.ssedampet_back.service.PetService;
import com.korit.ssedampet_back.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final AuthService authService;
    private final PetService petService;

    // 가입 시 최초 펫 정보 등록
    @PostMapping("/pet-info")
    public ResponseEntity<String> registerPet(@RequestBody PetCreateReqDto dto) {
        petService.registerPet(dto);

        return ResponseEntity.ok("반려동물이 등록되었습니다.");
    }

    // 통합 회원가입 완료 (유저 추가정보  + 펫 등록)
    @PostMapping("/signup/complete")
    public ResponseEntity<String> completeSignup(@RequestBody AdditionalInfoReqDto dto) {
        // 한 번에 유저 업데이트와 펫 등록
        authService.completeSignup(dto);
        return ResponseEntity.ok("회원가입 및 반려동물 등록이 완료되었습니다.");
    }

    @GetMapping("/me") // 최종 경로: GET /api/user/me
    public ResponseEntity<?> getMe(@AuthenticationPrincipal PrincipalUser principalUser) {
        // 1. 보안 필터에서 주입한 principalUser 확인
        if (principalUser == null) {
            // 인증 실패 시 401 반환
            return ResponseEntity.status(401).body("인증 정보가 없습니다.");
        }

        // 2. 유저 정보를 반환
        // 프론트엔드 AuthRoute에서 nickname과 hasPet 여부를 확인하므로
        // 반환되는 User 엔티티에 해당 필드들이 포함
        //유저 엔티티(id, nickname, hasPet 등)를 JSON으로 응답
        System.out.println("현재 로그인 유저 확인: " + principalUser.getUser());
        return ResponseEntity.ok(principalUser.getUser());

        //프론트엔드 (usersQueries.js): api.get("/api/user/me") 요청을 보냄.
        //백엔드 (AuthController): @GetMapping("/me")가 요청을 받아 PrincipalUser에서 유저 데이터를 꺼냄.
        //결과 반환: 유저 엔티티(id, nickname, hasPet 등)를 JSON으로 응답.
        //프론트엔드 (AuthRoute.jsx): 받은 데이터 중 nickname과 hasPet이 있는지 확인하여 페이지 이동을 결정함.
    }



}