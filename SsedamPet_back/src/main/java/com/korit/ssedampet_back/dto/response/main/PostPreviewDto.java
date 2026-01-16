package com.korit.ssedampet_back.dto.response.main;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostPreviewDto {
    private int postId;
    private int userId;
    private String postImgUrl;
    private int postLikeCnt;
    private int postCommentCnt;

}
