package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.LoginReqDto;
import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.mapper.UserMapper;
import com.korit.ssedampet_back.security.PrincipalUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    public User findUserByOauth2Id(String oauth2Id){
        return userMapper.findByOauth2Id(oauth2Id);
    }

    public User createUser(Authentication authentication) {
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();

        User user = principalUser.getUser();
        user.setDisplayNickname(createNickname());
        userMapper.insert(user);
        return user;
    }

    public String createNickname(){
        String newNickname = null;
        while (true){
            newNickname = userMapper.createNickname();
            if (userMapper.findByNickname(newNickname) == null){
                break;
            }
        }
        return newNickname;
    }

    public void registerUser(LoginReqDto dto) {

        User user = User.builder()
                .username(dto.getUsername())
                .email(dto.getEmail())
                .userBirth(dto.getUserBirth() == null ? LocalDate.now().atStartOfDay() : dto.getUserBirth().atStartOfDay())
                .phone(dto.getPhone())
                .displayNickname(dto.getDisplayNickname())
                .userProfileImgUrl(dto.getUserProfileImgUrl() == null ? "default.png" : dto.getUserProfileImgUrl())
                .build();

        userMapper.addUser(user);
    }
}