package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.dto.response.post.PostResponseDto;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

@Mapper
public interface PostMapper {
    // 목록 조회
    List<PostResponseDto> getPostList(@Param("sortBy") String sortBy, @Param("userId") Object userId);
    //sortBy : 정렬
    // 상세 조회 (게시글 한 개)
    Map<String, Object> getPostById(@Param("postId") int postId, @Param("userId") Object userId);
    // 피드 작성
    void savePost(Map<String, Object> postData);
    // 게시글 작성자 ID
    int findPostOwnerUserId(@Param("postId") int postId);

    int deletePost(@Param("postId") int postId, @Param("userId") int userId);
    int deleteComment(@Param("commentId") int commentId, @Param("userId") int userId);

//    // 좋아요 기능
//    int checkLike(@Param("postId") int postId, @Param("userId") int userId);
//    // 좋아요 추가
//    void insertLike(@Param("postId") int postId, @Param("userId") int userId);
//    // 좋아요 삭제
//    void deleteLike(@Param("postId") int postId, @Param("userId") int userId);

    // 좋아요 추가/삭제 시 post_tb에 카운트 업뎃
    void updateLikeCount(@Param("postId") int postId, @Param("amount") int amount);

}