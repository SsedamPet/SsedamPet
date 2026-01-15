package com.korit.ssedampet_back.dto.request;

import lombok.Data;

import java.time.LocalDate;

// 건강 체크리스트 작성 DTO
@Data
public class HealthLogCreateReqDto {
    private int petId;
    private LocalDate writeDate;
    private String waterStatus;
    private String foodStatus;
    private int poopCnt;
    private String symptom;
    private String healthlogMemo;





}
