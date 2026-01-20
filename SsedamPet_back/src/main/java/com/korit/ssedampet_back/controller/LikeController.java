package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/community")
public class LikeController {

    @Autowired
    private LikeService likeService;

    @PostMapping("/post/{postId}/like/test")
    public ResponseEntity<?> toggleLike(@PathVariable int postId) {
        int userId = 1; // 테스트용 유저 ID

        boolean isLiked = likeService.toggleLike(userId, postId);

        if (isLiked) {
            return ResponseEntity.ok("좋아요를 했습니다.");
        } else {
            return ResponseEntity.ok("좋아요를 취소했습니다.");
        }
    }
}
