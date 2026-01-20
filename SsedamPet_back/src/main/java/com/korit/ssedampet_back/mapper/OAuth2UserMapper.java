package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.entity.OAuth2UserEntity;
import com.korit.ssedampet_back.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OAuth2UserMapper {

    int addOAuth2User(OAuth2UserEntity oAuth2User);


    // provider + provider_user_id 로 OAuth2 유저 조회
    OAuth2UserEntity findByProviderAndProviderUserId(
            @Param("provider") String provider,
            @Param("providerUserId") String providerUserId
    );

    User findUserByOAuth2Info(
            @Param("provider") String provider,
            @Param("providerUserId") String providerUserId
    );



}
