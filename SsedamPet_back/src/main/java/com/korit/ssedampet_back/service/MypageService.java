package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.response.mypage.PetDto;
import com.korit.ssedampet_back.dto.response.mypage.UserDto;
import com.korit.ssedampet_back.mapper.MypageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final MypageMapper mypageMapper;

    public void getMypage(int userId) {
        // 1) user 정보
        UserDto user = mypageMapper.findMypageUser(userId);

        // 2) 카운트 (내 게시글 수 / 내가 좋아요 누른 게시글 수)
        int myPostCount = mypageMapper.countMyPosts(userId);
        int myLikedPostCount = mypageMapper.countMyLikedPosts(userId);

        // 3) 펫 목록
        List<PetDto> pets = mypageMapper.findMyPets(userId);


    }


}
