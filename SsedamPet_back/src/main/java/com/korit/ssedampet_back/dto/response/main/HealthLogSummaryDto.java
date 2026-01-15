package com.korit.ssedampet_back.dto.response.main;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HealthLogSummaryDto {
    private int healthlogId;
    private String waterStatus;
    private String foodStatus;
    private int poopCnt;
}
