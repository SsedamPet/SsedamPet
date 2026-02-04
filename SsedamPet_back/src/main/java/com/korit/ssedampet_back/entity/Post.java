package com.korit.ssedampet_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {

    private int postId;              // post_id (PK)
    private int userId;              // user_id
    private int petId;            // pet_id (nullable)

    private String postImgUrl;        // post_img_url  ✅ /image/posts/xxx.jpg
    private String postContent;       // post_content
    private Integer postLikeCnt;      // post_like_cnt
    private Integer postCommentCnt;   // post_comment_cnt
    private String postLocationTag;   // post_location_tag

    private LocalDateTime createdDt;  // created_dt
    private LocalDateTime updatedDt;  // updated_dt
}
