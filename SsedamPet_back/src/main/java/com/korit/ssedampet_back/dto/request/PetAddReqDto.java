package com.korit.ssedampet_back.dto.request;

import lombok.Data;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;

@Data
public class PetAddReqDto {

    // 프론트 변수명과 백엔드 변수명 자동 맞춤
    // @JsonProperty(access = JsonProperty.Access.READ_ONLY)


    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Integer petId;

    @Schema(accessMode = Schema.AccessMode.READ_ONLY)
    private Integer userId;
    // insert에 필요한 userId

    private String petType;            // "DOG" / "CAT"
    private String petName;
    private String petBreed;
    private LocalDate petBirth;           // "YYYY-MM-DD"
    private String petGender;          // "M" / "F"
    private Double petWeight;
    private String petProfileImgUrl;   // URL 방식
}
