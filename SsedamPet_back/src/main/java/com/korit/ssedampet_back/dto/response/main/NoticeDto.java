package com.korit.ssedampet_back.dto.response.main;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NoticeDto {
    private int noticeId;
    private int userId;
    private Integer senderUserId;    // HEALTH면 null 가능
    private Integer refId;
    private String title;
    private String noticeType;       // HEALTH, COMMENT, LIKE
    private String noticeMessage;
    private String linkUrl;
    private int isRead;              // 0/1
    private int status;

    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;
}
