package com.korit.ssedampet_back.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface LikeMapper {
    int existsByUserIdAndPostId(@Param("userId") int userId, @Param("postId") int postId);

    int insertLike(@Param("userId") int userId, @Param("postId") int postId);

    int deleteLike(@Param("userId") int userId, @Param("postId") int postId);
}
