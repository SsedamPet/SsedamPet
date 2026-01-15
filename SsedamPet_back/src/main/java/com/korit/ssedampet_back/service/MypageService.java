package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.response.MypageRespDto;
import com.korit.ssedampet_back.mapper.MypageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final MypageMapper mypageMapper;
    //묵데이터로 api 테스트
    /*public MypageRespDto getMypageMock() {
        return MypageRespDto.builder()
                .user(MypageRespDto.UserDto.builder()
                        .userId(1L)
                        .username("냥집사")
                        .email("testuser@email.com")
                        .userProfileImgUrl("https://cdn.ssedampet.com/profile/default.png")
                        .build())
                .summary(MypageRespDto.SummaryDto.builder()
                        // ✅ 의미 반영: 내가 작성한 글 수 / 내가 좋아요 누른 글 수
                        .myPostCount(0)
                        .myLikedPostCount(0)
                        .build())
                .pets(List.of(
                        MypageRespDto.PetDto.builder()
                                .petId(101L)
                                .petName("고양이 2세")
                                .petGender("M")
                                .petProfileImgUrl("https://cdn.ssedampet.com/pet/cat1.png")
                                .build(),
                        MypageRespDto.PetDto.builder()
                                .petId(102L)
                                .petName("낭만고양이")
                                .petGender("M")
                                .petProfileImgUrl("https://cdn.ssedampet.com/pet/cat2.png")
                                .build()
                ))
                .build();
    }*/



    public MypageRespDto getMypage(Long userId) {
        // 1) user 정보
        MypageRespDto.UserDto user = mypageMapper.findMypageUser(userId);

        // 2) 카운트 (내 게시글 수 / 내가 좋아요 누른 게시글 수)
        int myPostCount = mypageMapper.countMyPosts(userId);
        int myLikedPostCount = mypageMapper.countMyLikedPosts(userId);

        // 3) 펫 목록
        List<MypageRespDto.PetDto> pets = mypageMapper.findMyPets(userId);

        return MypageRespDto.builder()
                .user(user)
                .summary(MypageRespDto.SummaryDto.builder()
                        .myPostCount(myPostCount)
                        .myLikedPostCount(myLikedPostCount)
                        .build())
                .pets(pets)
                .build();
    }


}
