package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.entity.PetEntity;
import com.korit.ssedampet_back.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    public int saveUser(User user);
    int existsByProviderAndProviderId(@Param("provider") String provider, @Param("providerId") String providerId);
    User findByUserId(int userId);
}
