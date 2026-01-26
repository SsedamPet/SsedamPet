package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.dto.request.PetCreateReqDto;
import com.korit.ssedampet_back.entity.Pet;
import com.korit.ssedampet_back.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;

@Mapper
public interface UserMapper {
    int addUser(User user);

    User findByUserId(int userId);

    // 추가 정보 입력 단계에서의 정보 업데이트
    int addUserInfo(
            @Param("userId") int userId,
            @Param("displayNickname") String displayNickname,
            @Param("userBirth") LocalDate userBirth,
            @Param("phone") String phone,
            @Param("userProfileImgUrl") String userProfileImgUrl
    );

    int updateLastLoginDt(int userId);

}
