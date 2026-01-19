package com.korit.ssedampet_back.dto.response.main;

import com.korit.ssedampet_back.dto.response.mypage.PetDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MainDashboardRespDto {

    private List<PetDto> myPets;  // 내 펫 목록
    private HealthLogSummaryDto todayHealthLog; // 오늘 건강 요약
    private List<PostPreviewDto> popularPosts; // 인기 게시물 미리보기
}
