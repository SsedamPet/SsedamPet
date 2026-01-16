package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.dto.response.mypage.PetDto;
import com.korit.ssedampet_back.dto.response.mypage.PostDto;
import com.korit.ssedampet_back.dto.response.mypage.SummaryDto;
import com.korit.ssedampet_back.dto.response.mypage.UserDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MypageMapper {
    UserDto findMypageUser(@Param("userId") int userId);

    List<UserDto> findAllUsers();

    int countMyPosts(@Param("userId") int userId);

    int countMyLikedPosts(@Param("userId") int userId);

    List<PetDto> findMyPets(@Param("userId") int userId);

    List<PostDto> findMyPosts(@Param("userId") int userId);

    List<PostDto> findMyLikedPosts(@Param("userId") int userId);

}
