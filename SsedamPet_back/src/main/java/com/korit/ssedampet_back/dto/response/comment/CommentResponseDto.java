package com.korit.ssedampet_back.dto.response.comment;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CommentResponseDto {
    private int commentId;
    private int userId;
    private int postId;
    private Integer parentCommentId;
    private int depth;
    private String content;
    private int isDeleted;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;

    private String nickname;
    private String userProfileImgUrl;
}
