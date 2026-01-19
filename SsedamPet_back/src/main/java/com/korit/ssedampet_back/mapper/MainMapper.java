package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.dto.response.main.HealthLogSummaryDto;
import com.korit.ssedampet_back.dto.response.main.PostPreviewDto;
import com.korit.ssedampet_back.dto.response.mypage.PetDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MainMapper {

    // 1. 내 펫 목록 조회
    List<PetDto> getMyPets(int userId);

    // 2. 오늘의 건강 요약 조회 (가장 최근 기록 1건)
    HealthLogSummaryDto getTodayHealthLog(int userId);

    // 3. 인기 게시물 조회 (좋아요 순 상위 4개)
    List<PostPreviewDto> getPopularPosts();
}
