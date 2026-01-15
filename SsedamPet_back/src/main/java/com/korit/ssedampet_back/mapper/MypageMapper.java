package com.korit.ssedampet_back.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MypageMapper {
    MypageRespDto.UserDto findMypageUser(@Param("userId") int userId);

    int countMyPosts(@Param("userId") int userId);

    int countMyLikedPosts(@Param("userId") int userId);

    List<MypageRespDto.PetDto> findMyPets(@Param("userId") int userId);
}
