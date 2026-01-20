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
public class Like {
    private int likeId;
    private int userId;
    private int postId;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;
}
