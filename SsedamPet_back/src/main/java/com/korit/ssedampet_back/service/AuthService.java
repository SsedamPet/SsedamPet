package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.AdditionalInfoReqDto;
import com.korit.ssedampet_back.dto.request.SignupReqDto;
import com.korit.ssedampet_back.dto.request.PetCreateReqDto;
import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.mapper.OAuth2UserMapper;
import com.korit.ssedampet_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;
    private final OAuth2UserMapper oAuth2UserMapper;
    private final PetService petService;

    public boolean isValidNickname(String nickname) {
        return userMapper.findByNickname(nickname) == null;
    }

    // 1단계: 소셜 로그인 직후 '깡통 유저' 생성 (DTO 버전)
    @Transactional
    public User registerUser(SignupReqDto dto) {
        return null;
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