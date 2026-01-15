package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.response.mypage.MyPageRespDto;
import com.korit.ssedampet_back.dto.response.mypage.PetDto;
import com.korit.ssedampet_back.dto.response.mypage.SummaryDto;
import com.korit.ssedampet_back.dto.response.mypage.UserDto;
import com.korit.ssedampet_back.mapper.MypageMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final MypageMapper mypageMapper;

    public MyPageRespDto getMypage(int userId) {

        UserDto user = getUser(userId);
        SummaryDto summary = getSummary(userId);
        List<PetDto> pets = getPets(userId);

        return MyPageRespDto.builder()
                .user(user)
                .summary(summary)
                .pets(pets)
                .build();
    }

    public UserDto getUser(int userId) {
        UserDto user = mypageMapper.findMypageUser(userId);
        if (user == null) {
            try {
                throw new NotFoundException("user notfound!!");
            } catch (NotFoundException e) {
                throw new RuntimeException(e);
            }
        }
        return user;
    }

    private SummaryDto getSummary(int userId) {
        int myPostCount = mypageMapper.countMyPosts(userId);
        int myLikedPostCount = mypageMapper.countMyLikedPosts(userId);

        return SummaryDto.builder()
                .myPostCount(myPostCount)
                .myLikedPostCount(myLikedPostCount)
                .build();
    }

    private List<PetDto> getPets(int userId) {
        List<PetDto> pets = mypageMapper.findMyPets(userId);
        return pets == null ? Collections.emptyList() : pets;
    }


}
