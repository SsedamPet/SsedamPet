package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.response.main.HealthLogSummaryDto;
import com.korit.ssedampet_back.dto.response.main.MainDashboardRespDto;
import com.korit.ssedampet_back.dto.response.main.PetListDto;
import com.korit.ssedampet_back.dto.response.main.PostPreviewDto;
import com.korit.ssedampet_back.mapper.MainMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MainService {

    private final MainMapper mainMapper;

    public MainDashboardRespDto getMainDashboard(int userId) {
        // 내 펫 목록
        List<PetListDto> myPets = mainMapper.getMyPets(userId);

        // 오늘 건강 요약
        HealthLogSummaryDto todayHealthLog = mainMapper.getTodayHealthLog(userId);

        // 오늘 기록 없을 경우
        if (todayHealthLog == null) {
            todayHealthLog = HealthLogSummaryDto.builder()
                    .healthlogId(0)
                    .waterStatus("-")
                    .foodStatus("-")
                    .poopCnt(0)
                    .build();
        }

        // 인기 게시물 조회
        List<PostPreviewDto> popularPosts = mainMapper.getPopularPosts();

        return MainDashboardRespDto.builder()
                .myPets(myPets)
                .todayHealthLog(todayHealthLog)
                .popularPosts(popularPosts)
                .build();


    }
}
