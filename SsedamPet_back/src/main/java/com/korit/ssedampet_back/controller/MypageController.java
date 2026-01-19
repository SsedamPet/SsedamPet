package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.request.PetAddReqDto;
import com.korit.ssedampet_back.dto.response.mypage.*;
import com.korit.ssedampet_back.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MypageController {

    private final MypageService mypageService;

    @GetMapping("/user")
    public ResponseEntity<UserDto> user(@RequestParam int userId) {
        return ResponseEntity.ok(mypageService.getUser(userId));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> users() {
        return ResponseEntity.ok(mypageService.getUsers());
    }

    @GetMapping("/summary")
    public ResponseEntity<SummaryDto> summary(@RequestParam int userId) {
        return ResponseEntity.ok(mypageService.getSummary(userId));
    }

    @GetMapping("/pets")
    public ResponseEntity<List<PetDto>> pets(@RequestParam int userId) {
        return ResponseEntity.ok(mypageService.getPets(userId));
    }

    @PostMapping("/pets")
    public ResponseEntity<CreatePetRespDto> createPet(@RequestParam int userId, @RequestBody PetAddReqDto dto) {
        // TODO: 로그인 로직 구현시 userId 직접 받아와서 전달
        // int userId = principal.getUserId();
        dto.setUserId(userId);
        return ResponseEntity.ok(mypageService.createPet(dto));
    }

    @GetMapping("/my-posts")
    public ResponseEntity<List<PostDto>> posts(@RequestParam int userId) {
        return ResponseEntity.ok(mypageService.getMyPosts(userId));
    }

    @GetMapping("/liked-posts")
    public ResponseEntity<List<PostDto>> likedPosts(@RequestParam int userId) {
        return ResponseEntity.ok(mypageService.getLikedPosts(userId));
    }


}
