package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.PetAddReqDto;
import com.korit.ssedampet_back.dto.request.PetCreateReqDto;
import com.korit.ssedampet_back.dto.response.mypage.*;
import com.korit.ssedampet_back.mapper.MypageMapper;
import com.korit.ssedampet_back.mapper.PetMapper;
import com.korit.ssedampet_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.javassist.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.PriorityBlockingQueue;

@Service
@RequiredArgsConstructor
public class MypageService {

    private final MypageMapper mypageMapper;
    private final PetMapper petMapper;
    private final FileService fileService;

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

    public PetAddRespDto addPet(PetAddReqDto dto) {

        petMapper.insertPet(dto);

        return new PetAddRespDto(dto.getPetId());
    }

    public String updatePetProfileImage(int userId, int petId, MultipartFile file) {
        String url = fileService.savePetProfile(file);
        if (url == null) {
            throw new RuntimeException("file upload failed");
        }

        int updated = mypageMapper.updatePetProfileImgUrlInt(userId, petId, url);
        if (updated == 0) {
            throw new RuntimeException("pet을 찾을 수 없거나 소유주의 펫이 아닙니다.");

        }
        return url;

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
