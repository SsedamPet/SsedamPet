package com.korit.ssedampet_back.dto.response.mypage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
@Data
public class SummaryDto {
    private int myPostCount;              // 내가 올린 게시글 수
    private int myLikedPostCount;         // 내가 좋아요 누른 게시글 수
}