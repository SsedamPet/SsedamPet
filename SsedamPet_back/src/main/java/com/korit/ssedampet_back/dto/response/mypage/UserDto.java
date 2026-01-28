package com.korit.ssedampet_back.dto.response.mypage;

import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {
    private int userId;
    private String name;              // user_tb.name
    private String email;                 // user_tb.email
    private String userProfileImgUrl;     // user_tb.user_profile_img_url
}