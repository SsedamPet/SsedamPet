package com.korit.ssedampet_back.dto.response.mypage;

import lombok.Builder;
import lombok.Data;

@Data
@Builder

public class PostCreateRespDto {
    private int postId;
    private String postImgUrl;
}
