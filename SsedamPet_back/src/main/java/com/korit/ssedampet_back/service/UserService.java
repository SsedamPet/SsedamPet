package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.AdditionalInfoReqDto;
import com.korit.ssedampet_back.dto.request.LoginReqDto;
import com.korit.ssedampet_back.dto.request.PetCreateReqDto;
import com.korit.ssedampet_back.entity.OAuth2UserEntity;
import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.mapper.OAuth2UserMapper;
import com.korit.ssedampet_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final OAuth2UserMapper oAuth2UserMapper;
    private final PetService petService;

    // 1단계: 소셜 로그인 직후 '깡통 유저' 생성 (DTO 버전)
    @Transactional
    public User registerUser(LoginReqDto dto) {
        return registerUser(
                dto.getEmail(),
                dto.getName(),
                dto.getUserProfileImgUrl(),
                dto.getProvider(),
                dto.getProviderUserId()
        );
    }

    // 1단계: 소셜 로그인 직후 '깡통 유저' 생성 (실제 로직)
    @Transactional
    public User registerUser(String email,
                             String name,
                             String profileImgUrl,
                             String provider,
                             String providerUserId) {

        // [수정] provider가 null로 넘어올 경우를 대비한 2중 방어
        String finalProvider = (provider != null) ? provider.toUpperCase() : "GOOGLE";

        User user = User.builder()
                .username(name)
                .email(email)
                .displayNickname(name)
                .userProfileImgUrl(profileImgUrl == null ? "default.png" : profileImgUrl)
                .build();

        userMapper.addUser(user);

        oAuth2UserMapper.addOAuth2User(OAuth2UserEntity.builder()
                .userId(user.getUserId())
                .provider(OAuth2UserEntity.Provider.valueOf(finalProvider)) // 안전하게 변환
                .providerUserId(providerUserId)
                .build());

        return user;
    }

    // 2단계: 추가 정보 입력 완료
    @Transactional
    public void completeSignup(AdditionalInfoReqDto dto) {
        // 1. 유저 상세 정보 업데이트
        userMapper.addUserInfo(
                dto.getUserId(),
                dto.getDisplayNickname(),
                dto.getUserBirth(),
                dto.getPhone(),
                dto.getUserProfileImgUrl()
        );

        // 2. [핵심] AdditionalInfoReqDto -> PetCreateReqDto 변환
        PetCreateReqDto petDto = PetCreateReqDto.builder()
                .userId(dto.getUserId())
                .petName(dto.getPetName())
                .petType(dto.getPetType())
                .petBreed(dto.getPetBreed())
                .petBirth(dto.getPetBirth())
                .petGender(dto.getPetGender())
                .petWeight(dto.getPetWeight())
                .build();

        // 3. 변환된 객체로 PetService 호출
        petService.registerPet(petDto);


    }
}