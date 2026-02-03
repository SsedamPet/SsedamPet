package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.mapper.PostMapper;
import com.korit.ssedampet_back.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.HandlerMapping;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/community")
public class PostController {

    private final PostMapper postMapper; // service 없이 직접 연결

    private final LikeService likeService;

    /*
    게시글 목록 가져오기 API
    요청 주소 : GET http://localhost:8080/api/community/posts?sortBy=latest
     */
    @GetMapping("/posts")
    public ResponseEntity<?> getPosts(@RequestParam(defaultValue = "latest") String sortBy) {
        return ResponseEntity.ok(postMapper.getPostList(sortBy));
        // Mapper에게 데이터 가져오라 시키고 그 결과를 이액트에게 200(ok) 신호와 함께 보낸다.
    }
    @GetMapping("/post/{postId}")
    public ResponseEntity<?> getPostById(@PathVariable("postId") int postId) {
        // 이 ID 번호 게시글 하나 가져오기 Mapper 에게
        Map<String, Object> post = postMapper.getPostById(postId);

        if (post == null) {
            return ResponseEntity.status(404).body("존재하지 않는 게시글입니다.");
        }

        return ResponseEntity.ok(post);
    }

    @PostMapping("/post")
    public ResponseEntity<?> createPost(
            @RequestParam("content") String content,
            @RequestParam("userId") Long userId,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        try {
            String imageUrl = null;

            if (image != null && !image.isEmpty()) {
                String uploadDir = "C:/gov/project/SsedamPet/img_uploads/";
                File dir = new File(uploadDir);
                if (!dir.exists()) dir.mkdirs(); // 1. 파일 저장할 경로 설정

                // 2. 파일 이름 중복 방지를 위해 앞에 시간 붙이기
                String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();

                // 3. 실제 폴더에 파일 저장됨
                File targetFile = new File(uploadDir + fileName);
                image.transferTo(targetFile);

                // 4. DB에 나중에 브라우저가 접근할 파일명만 저장
                imageUrl = fileName;
            }

            // 5. DB 저장용 맵
            Map<String, Object> postData = new HashMap<>();
            postData.put("content", content);
            postData.put("userId", userId);
            postData.put("imageUrl", imageUrl); // 이미지 경로 추가

            postMapper.savePost(postData);

            return ResponseEntity.ok("피드가 등록되었습니다!");

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("파일 저장 중 에러 발생: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("기타 에러 발생: " + e.getMessage());
        }
    }


}