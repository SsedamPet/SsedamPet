package com.korit.ssedampet_back.dto.response.healthlog;

import lombok.Data;

// 계산된 주간 평균 데이터
@Data
public class HealthWeeklyAvgDto {
    private double avgPoopCnt;
    private double avgWaterScore;
    private double avgFoodScore;

}
