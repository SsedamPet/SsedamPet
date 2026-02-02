package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.request.PetAddReqDto;
import com.korit.ssedampet_back.dto.response.mypage.*;
import com.korit.ssedampet_back.security.PrincipalUser;
import com.korit.ssedampet_back.service.MypageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MypageController {

    private final MypageService mypageService;

    private int principalUser() {
        PrincipalUser principalUser = PrincipalUser.getAuthenticatedPrincipalUser();

        if (principalUser == null ) {
            throw new RuntimeException("Unauthenticated");
        }
        return principalUser.getUser().getUserId();

    }

    @GetMapping("/user")
    public ResponseEntity<UserDto> user() {
        return ResponseEntity.ok(mypageService.getUser(principalUser()));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> users() {
        return ResponseEntity.ok(mypageService.getUsers());
    }

    @GetMapping("/summary")
    public ResponseEntity<SummaryDto> summary() {
        return ResponseEntity.ok(mypageService.getSummary(principalUser()));
    }

    @GetMapping("/pets")
    public ResponseEntity<List<PetDto>> pets() {
        return ResponseEntity.ok(mypageService.getPets(principalUser()));
    }

    @PostMapping("/pets")
    public ResponseEntity<PetAddRespDto> createPet(@RequestBody PetAddReqDto dto) {
        // TODO: 로그인 로직 구현시 userId 직접 받아와서 전달
        // int userId = principal.getUserId();
        dto.setUserId(principalUser());
        return ResponseEntity.ok(mypageService.addPet(dto));
    }

    @PostMapping(value = "/pets/{petId}/pet-profile-image", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadPetProfileImage(@PathVariable int petId, @RequestPart("file")MultipartFile file) {
        int userId = principalUser();

        String petImageUrl = mypageService.updatePetProfileImage(userId, petId, file);

        return ResponseEntity.ok(petImageUrl);
    }

    @GetMapping("/my-posts")
    public ResponseEntity<List<PostDto>> posts() {
        return ResponseEntity.ok(mypageService.getMyPosts(principalUser()));
    }

    @GetMapping("/liked-posts")
    public ResponseEntity<List<PostDto>> likedPosts() {
        return ResponseEntity.ok(mypageService.getLikedPosts(principalUser()));
    }




}
