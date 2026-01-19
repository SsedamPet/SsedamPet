package com.korit.ssedampet_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int userId;
    private String username;
    private String email;
    private LocalDateTime userBirth;
    private String phone;
    private String displayNickname;
    private String userProfileImgUrl;
    private LocalDateTime lastLoginDt;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;



}
