package com.korit.ssedampet_back.dto.response.post;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PostResponseDto {
    private int postId;
    private int userId;
    private String postImgUrl;
    private String postContent;
    private int postLikeCnt;
    private int postCommentCnt;
    private String postLocationTag;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;

    private String displayUsername; // User에 있는거
    private String userProfileImgUrl; // User에 있는거
}
