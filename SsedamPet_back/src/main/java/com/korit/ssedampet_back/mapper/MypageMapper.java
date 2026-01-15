package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.dto.response.MypageRespDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MypageMapper {
    MypageRespDto.UserDto findMypageUser(@Param("userId") Long userId);

    int countMyPosts(@Param("userId") Long userId);

    int countMyLikedPosts(@Param("userId") Long userId);

    List<MypageRespDto.PetDto> findMyPets(@Param("userId") Long userId);
}
