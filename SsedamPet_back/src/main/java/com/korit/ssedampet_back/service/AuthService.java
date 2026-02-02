package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.AdditionalInfoReqDto;
import com.korit.ssedampet_back.dto.request.SignupReqDto;
import com.korit.ssedampet_back.dto.request.PetCreateReqDto;
import com.korit.ssedampet_back.entity.OAuth2UserEntity;
import com.korit.ssedampet_back.entity.User;
import com.korit.ssedampet_back.mapper.OAuth2UserMapper;
import com.korit.ssedampet_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserMapper userMapper;
    private final OAuth2UserMapper oAuth2UserMapper;
    private final PetService petService;
    private final FileService fileService;

    public boolean isValidNickname(String nickname) {
        return userMapper.findByNickname(nickname) == null;
    }


    @Transactional
    public User signup(SignupReqDto dto) {
        String imgUrl = dto.getProfileImgUrl();
        if (dto.getProfileImgFile() != null && !dto.getProfileImgFile().isEmpty()) {
            imgUrl = fileService.saveFile(dto.getProfileImgFile());
        }

        // 2. 생년월일 문자열(20010830)을 LocalDateTime으로 변환
        // 시간 정보가 없으므로 00:00:00으로 세팅합니다.
        String birthStr = dto.getBirthDate();
        java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("yyyyMMdd");
        java.time.LocalDateTime birthDateTime = java.time.LocalDate.parse(birthStr, formatter).atStartOfDay();

        User user = User.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .birthDate(birthDateTime)
                .phone(dto.getPhone())
                .nickname(dto.getNickname())
                .userProfileImgUrl(imgUrl)
                .build();

        userMapper.addUser(user);

        int generatedId = user.getUserId();
        System.out.println("생성된 유저 ID: " + generatedId);

        oAuth2UserMapper.addOAuth2User(
                user.getUserId(), // 자동 생성된 ID 사용
                dto.getProvider(),
                dto.getProviderUserId()
        );
        return user;
    }

    // 2단계: 추가 정보 입력 완료
    @Transactional
    public void completeSignup(AdditionalInfoReqDto dto) {
        // 1. 유저 상세 정보 업데이트
        userMapper.addUserInfo(
                dto.getUserId(),
                dto.getNickname(),
                dto.getBirthDate(),
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