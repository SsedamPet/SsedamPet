package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.UserRequestDto;
import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    public void registerUser(UserRequestDto dto) {

        User user = User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .userBirth(dto.getUserBirth() == null ? LocalDate.now().atStartOfDay() : dto.getUserBirth().atStartOfDay())
                .phone(dto.getPhone())
                .displayUsername(dto.getDisplayUsername())
                .userProfileImgUrl(dto.getUserProfileImgUrl() == null ? "default.png" : dto.getUserProfileImgUrl())
                .build();

        userMapper.saveUser(user);
    }
}