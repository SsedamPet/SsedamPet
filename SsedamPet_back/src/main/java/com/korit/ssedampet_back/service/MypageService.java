package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.mapper.MypageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final MypageMapper mypageMapper;

    public MypageRespDto getMypage(int userId) {
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
