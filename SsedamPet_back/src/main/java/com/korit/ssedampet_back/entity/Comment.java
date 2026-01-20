package com.korit.ssedampet_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    private int commentId;
    private int userId;
    private int postId;
    private Integer parentCommentId;
    private int depth;
    private String commentContent;
    private int isDeleted;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;
}
