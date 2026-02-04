package com.korit.ssedampet_back.dto.response.mypage;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostDto {
    private int postId;
    private int userId;
    private String postImgUrl;
    private String postContent;
    private int postLikeCnt;
    private int postCommentCnt;
    private String postLocationTag;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;
}


