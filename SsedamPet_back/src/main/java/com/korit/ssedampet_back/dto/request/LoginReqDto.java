package com.korit.ssedampet_back.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginReqDto {

    private String username;
    private String email;
    private LocalDate userBirth;
    private String phone;
    private String displayNickname;
    private String userProfileImgUrl;

}