package com.korit.ssedampet_back.mapper;

import com.korit.ssedampet_back.dto.response.comment.CommentResponseDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

@Mapper
public interface CommentMapper {
    // 특정 게시글 댓글 모두 조회
    List<CommentResponseDto> getCommentsByPostId(@Param("postId") int postId);
    
    // 댓글 저장학시
    void saveComment(Map<String, Object> commentData);

    // 댓글 작성 시 post_tb의 댓글 수가 증가
    void updatePostCommentCount(@Param("postId") int postId, @Param("amount") int amount);
}
