package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.CreatePetReqDto;
import com.korit.ssedampet_back.dto.response.mypage.*;
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
    private final PetMapper petMapper;

    // TODO: 마이페이지 전체 정보 조회
    /*public MypageRespDto getMypage(int userId) {
        return MypageRespDto.builder()
                .user(getUser(userId))
                .summary(getSummary(userId))
                .pets(getPets(userId))
                .posts(getPosts(userId))
                .build();
    }*/

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

    public List<UserDto> getUsers() {
        List<UserDto> users = mypageMapper.findAllUsers();
        return users == null ? Collections.emptyList() : users;
    }



    public SummaryDto getSummary(int userId) {
        int myPostCnt = mypageMapper.countMyPosts(userId);
        int myLikedPostCnt = mypageMapper.countMyLikedPosts(userId);

        return SummaryDto.builder()
                .myPostCnt(myPostCnt)
                .myLikedPostCnt(myLikedPostCnt)
                .build();
    }

    public List<PetDto> getPets(int userId) {
        List<PetDto> pets = mypageMapper.findMyPets(userId);
        return pets == null ? Collections.emptyList() : pets;
    }

    public CreatePetRespDto createPet(CreatePetReqDto dto) {
        petMapper.insertPet(dto);

        return new CreatePetRespDto(dto.getPetId());
    }

    public List<PostDto> getMyPosts(int userId) {
        List<PostDto> posts = mypageMapper.findMyPosts(userId);
        return posts == null ? Collections.emptyList() : posts;
    }

    public List<PostDto> getLikedPosts(int userId) {
        List<PostDto> posts = mypageMapper.findMyLikedPosts(userId);
        return posts == null ? Collections.emptyList() : posts;
    }


}
