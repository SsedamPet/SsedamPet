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





// DB 테이블 체크 (중요!)
//MySQL에서 posts 테이블에 이미지 경로를 담을 공간이 있는지 확인해 보세요. 없다면 아래 명령어로 추가해야 합니다.
//명령어: ALTER TABLE posts ADD COLUMN image_url VARCHAR(255);

// 리액트 팀원에게 알려줄 내용
//사진을 보낼 때는 리액트에서 FormData 객체를 사용해서 보내야 한다고 꼭 말해줘야 합니다.
//Content-Type: multipart/form-data
//Key 이름: title, content, userId, image (이 이름들이 컨트롤러의 @RequestParam과 똑같아야 함)

// 2. 설정 파일(application.properties)에 파일 용량 제한 추가
//기본적으로 스프링은 큰 파일을 거부합니다. 사진을 올리려면 아래 내용을 application.properties 맨 밑에 추가하세요.

//# 파일 하나당 최대 용량 (10MB)
//spring.servlet.multipart.max-file-size=10MB
//# 한 번의 요청에 담긴 전체 파일 최대 용량 (10MB)
//spring.servlet.multipart.max-request-size=10MB

// 이제 백엔드에 이 코드를 넣으면 다음과 같은 테스트가 가능해집니다.
//전체 목록 보기: GET /api/community/posts -> 여러 개의 게시물 리스트가 뜸.
//상세 보기: GET /api/community/post/5 -> 5번 게시글의 내용만 딱 하나 뜸.
// 리액트에서 구현될 모습
//프론트엔드 담당자는 이제 커뮤니티 홈에서 게시글 카드를 만들 때, 클릭 이벤트에 Maps('/post/' + post.id) 같은 코드를 넣어 상세 페이지로 이동시키고, 위에서 만든 API를 호출하여 화면에 뿌려주게 됩니다.

// 좋아요 중복 방지
// ALTER TABLE `like_tb`
//ADD UNIQUE INDEX `uq_user_post` (`user_id` ASC, `post_id` ASC);