package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.security.PrincipalUser;
import com.korit.ssedampet_back.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/community")
public class LikeController {


    private final LikeService likeService;

    private int principalUserId() {
        PrincipalUser principalUser = PrincipalUser.getAuthenticatedPrincipalUser();
        if (principalUser == null) {
            return 0;
        }
        return principalUser.getUser().getUserId();
    }

    @PostMapping("/post/{postId}/like")
    public ResponseEntity<?> toggleLike(@PathVariable int postId) {
        int userId = principalUserId();

        if (userId == 0) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        boolean isLiked = likeService.toggleLike(userId, postId);

        return ResponseEntity.ok(isLiked ? "좋아요를 눌렀습니다." : "좋아요를 취소했습니다.");
    }
}
