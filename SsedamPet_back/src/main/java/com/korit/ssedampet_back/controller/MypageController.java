package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.request.PetAddReqDto;
import com.korit.ssedampet_back.dto.request.PostCreateReqDto;
import com.korit.ssedampet_back.dto.response.mypage.*;
import com.korit.ssedampet_back.security.PrincipalUser;
import com.korit.ssedampet_back.service.MypageService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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


    @PostMapping(value = "/posts", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostCreateRespDto> createPost(@ModelAttribute PostCreateReqDto dto) {
        int userId = principalUser();

        dto.setUserId(userId);

        return ResponseEntity.ok(mypageService.createPostWithImage(dto, dto.getFile()));
    }


    // ✅ [추가] MypageController.java

    @PostMapping(value = "/posts/{postId}/post-image", consumes = "multipart/form-data")
    public ResponseEntity<?> updatePostImage(
            @PathVariable int postId,
            @RequestPart("file") MultipartFile file
    ) {
        int userId = principalUser(); // ✅ 로그인 유저
        String postImgUrl = mypageService.updatePostImage(userId, postId, file); // ✅ 저장 + DB 업데이트
        return ResponseEntity.ok(postImgUrl); // ✅ "/image/posts/xxxx.jpg" 반환
    }


    // 서비스에서 postImgUrl을 "/image/posts/**" 형태로 변환해서 내려줌
    @GetMapping("/my-posts")
    public ResponseEntity<List<PostDto>> posts() {
        return ResponseEntity.ok(mypageService.getMyPosts(principalUser()));
    }

    // 서비스에서 postImgUrl을 "/image/posts/**" 형태로 변환해서 내려줌
    @GetMapping("/liked-posts")
    public ResponseEntity<List<PostDto>> likedPosts() {
        return ResponseEntity.ok(mypageService.getLikedPosts(principalUser()));
    }





}
