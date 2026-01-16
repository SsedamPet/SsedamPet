package com.korit.ssedampet_back.dto.response.healthlog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HealthWeeklyComparisonDto {
    private HealthWeeklyAvgDto lastWeek;  // 지난 주 평균
    private HealthWeeklyAvgDto thisWeek;  // 이번 주 평균
}
