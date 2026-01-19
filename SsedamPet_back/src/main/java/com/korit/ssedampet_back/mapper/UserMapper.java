package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.dto.request.PetCreateReqDto;
import com.korit.ssedampet_back.entity.Pet;
import com.korit.ssedampet_back.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    int addUser(User user);
    int existsByProviderAndProviderId(@Param("provider") String provider, @Param("providerId") String providerId);
    User findByUserId(int userId);

    // 가입 시 펫 정보 입력
    int savePet(PetCreateReqDto dto);
}
