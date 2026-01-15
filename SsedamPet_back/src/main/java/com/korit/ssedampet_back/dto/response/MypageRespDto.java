package com.korit.ssedampet_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@Builder
public class MypageRespDto {

    private UserDto user;
    private SummaryDto summary;
    private List<PetDto> pets;

    @Getter
    @Builder
    @AllArgsConstructor
    @Data
    public static class UserDto {
        private Long userId;
        private String username;              // user_tb.username
        private String email;                 // user_tb.email
        private String userProfileImgUrl;     // user_tb.user_profile_img_url
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @Data
    public static class SummaryDto {
        private int myPostCount;              // ✅ 내가 올린 게시글 수
        private int myLikedPostCount;         // ✅ 내가 좋아요 누른 게시글 수
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @Data
    public static class PetDto {
        private Long petId;                   // pet_tb.pet_id
        private String petName;               // pet_tb.pet_name
        private String petGender;             // pet_tb.pet_gender ("M","F")
        private String petProfileImgUrl;      // pet_tb.pet_profile_img_url
    }
}