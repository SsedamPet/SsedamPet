package com.korit.ssedampet_back.dto.response.mypage;

import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SummaryDto {
    private int myPostCnt;              // 내가 올린 게시글 수
    private int myLikedPostCnt;         // 내가 좋아요 누른 게시글 수
}

