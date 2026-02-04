package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.mapper.PostMapper;
import com.korit.ssedampet_back.security.PrincipalUser;
import com.korit.ssedampet_back.service.FileService;
import com.korit.ssedampet_back.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/community")
public class PostController {

    private final PostMapper postMapper;
    private final LikeService likeService;
    private final FileService fileService;

    @GetMapping("/posts")
    public ResponseEntity<?> getPosts(@RequestParam(defaultValue = "latest") String sortBy) {
        // [수정] 로그인 유저 정보를 가져와서 매퍼에 같이 전달
        PrincipalUser principalUser = PrincipalUser.getAuthenticatedPrincipalUser();
        Object userId = (principalUser != null) ? principalUser.getUserId() : null;

        return ResponseEntity.ok(postMapper.getPostList(sortBy, userId));
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<?> getPostById(@PathVariable("postId") int postId) {
        // [수정] 상세 보기에서도 좋아요 상태 확인을 위해 userId 전달
        PrincipalUser principalUser = PrincipalUser.getAuthenticatedPrincipalUser();
        Object userId = (principalUser != null) ? principalUser.getUserId() : null;

        Map<String, Object> post = postMapper.getPostById(postId, userId);

        if (post == null) {
            return ResponseEntity.status(404).body("존재하지 않는 게시글입니다.");
        }

        return ResponseEntity.ok(post);
    }

    @PostMapping("/post")
    public ResponseEntity<?> createPost(
            @RequestParam("content") String content,
            @RequestParam("userId") int userId, // 타입을 int로 변경
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            String imageUrl = fileService.savePostFile(image);

            Map<String, Object> postData = new HashMap<>();
            postData.put("content", content);
            postData.put("userId", userId);
            postData.put("imageUrl", imageUrl);

            postMapper.savePost(postData);

            return ResponseEntity.ok("피드가 등록되었습니다!");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("기타 에러 발생: " + e.getMessage());
        }
    }

    @DeleteMapping("/post/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable int postId) {
        PrincipalUser principalUser = PrincipalUser.getAuthenticatedPrincipalUser();
        if (principalUser == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        int userId = principalUser.getUserId();
        int result = postMapper.deletePost(postId, userId);

        if (result > 0) {
            return ResponseEntity.ok("게시글이 삭제되었습니다.");
        }
        return ResponseEntity.status(403).body("본인 게시글만 삭제할 수 있습니다.");
    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable int commentId) {
        PrincipalUser principalUser = PrincipalUser.getAuthenticatedPrincipalUser();
        if (principalUser == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        int userId = principalUser.getUserId();
        int result = postMapper.deleteComment(commentId, userId);

        if (result > 0) {
            return ResponseEntity.ok("댓글이 삭제되었습니다.");
        }
        return ResponseEntity.status(403).body("본인 댓글만 삭제할 수 있습니다.");
    }
}