package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.mapper.CommentMapper;
import com.korit.ssedampet_back.security.PrincipalUser;
import com.korit.ssedampet_back.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    private int principalUserId() {
        PrincipalUser principal = PrincipalUser.getAuthenticatedPrincipalUser();
        if (principal == null) return 0;
        return principal.getUser().getUserId();
    }

    // 댓글 목록 조회
    @GetMapping("/post/{postId}/comments")
    public ResponseEntity<?> getComments(@PathVariable int postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }
    
    // 댓/답글 등록
    /*@PostMapping("/post/{postId}/comments")
    public ResponseEntity<?> createComment(@PathVariable int postId, @RequestBody Map<String, Object> commentData) {
        try {
            commentData.put("postId", postId);

            // parentCommentId가 있다 = 답글(depth 1), 없다 댓글(depth 0)
            if (commentData.get("parentCommentId") != null) {
                commentData.put("depth", 1);
            } else {
                commentData.put("parentCommentId", null);
                commentData.put("depth", 0);
            }

            commentMapper.saveComment(commentData);
            commentMapper.updatePostCommentCount(postId, 1);

            return ResponseEntity.ok("등록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("오류 발생: " + e.getMessage());
        }
    }*/

    @PostMapping("/post/{postId}/comments")
    public ResponseEntity<?> createComment(@PathVariable int postId, @RequestBody Map<String, Object> commentData) {

        int userId = principalUserId();
        if (userId == 0) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        try {
            commentService.createComment(userId, postId, commentData);
            return ResponseEntity.ok("등록되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("오류 발생: " + e.getMessage());
        }
    }



}
