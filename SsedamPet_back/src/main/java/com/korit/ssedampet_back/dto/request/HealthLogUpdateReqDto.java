package com.korit.ssedampet_back.dto.request;

import lombok.Data;

// 건강 체크리스트 작성 DTO
@Data
public class HealthLogUpdateReqDto {
    private int healthlogId;
    private String waterStatus;
    private String foodStatus;
    private int poopCnt;
    private String symptom;
    private String healthlogMemo;
}
