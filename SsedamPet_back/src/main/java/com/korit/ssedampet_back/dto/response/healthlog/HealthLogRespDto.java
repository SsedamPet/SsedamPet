package com.korit.ssedampet_back.dto.response.healthlog;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class HealthLogRespDto {
    private int healthLogId;
    private int petId;
    private LocalDate wrtieDate;
    private String waterStatus;
    private String foodStatus;
    private int poopCnt;
    private String symptom;
    private String healthLogMemo;
    private LocalDateTime createdDt;
    private LocalDateTime updateDt;

}
