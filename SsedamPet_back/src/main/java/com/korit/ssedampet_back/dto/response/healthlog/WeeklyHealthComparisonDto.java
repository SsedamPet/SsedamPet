package com.korit.ssedampet_back.dto.response.healthlog;

import lombok.Data;

@Data
public class WeeklyHealthComparisonDto {
    private HealthWeeklyAvgDto lastWeek;  // 지난 주 평균
    private HealthWeeklyAvgDto thisWeek;  // 이번 주 평균
}
