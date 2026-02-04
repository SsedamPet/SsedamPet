package com.korit.ssedampet_back.dto.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class PostCreateReqDto {
    private int userId;
    private int petId;              // 필요 없으면 빼도 됨
    private String postContent;
    private String postLocationTag;
    private MultipartFile file;
}
