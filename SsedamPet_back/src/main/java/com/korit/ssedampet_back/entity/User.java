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
    private String name;
    private String email;
    private LocalDateTime birthDate;
    private String phone;
    private String nickname;
    private String userProfileImgUrl;
    private LocalDateTime lastLoginDt;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;



}
