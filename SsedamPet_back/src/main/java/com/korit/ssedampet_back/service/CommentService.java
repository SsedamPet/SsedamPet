package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.response.main.NoticeDto;
import com.korit.ssedampet_back.mapper.CommentMapper;
import com.korit.ssedampet_back.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final PostMapper postMapper;
    private final NoticeService noticeService;
    private final CommentMapper commentMapper;

    public List<Map<String, Object>> getCommentsByPostId(int postId) {
        return commentMapper.getCommentsByPostId(postId);
    }

    @Transactional
    public void createComment(int userId, int postId, Map<String, Object> commentData) {

        commentData.put("userId", userId);
        commentData.put("postId", postId);

        if (commentData.get("parentCommentId") != null) {
            commentData.put("depth", 1);
        } else {
            commentData.put("parentCommentId", null);
            commentData.put("depth", 0);
        }

        commentMapper.saveComment(commentData);

        commentMapper.updatePostCommentCount(postId, 1);

        // commentMapper.insertComment(userId, postId, commentData); // 댓글 저장

        int receiverUserId = postMapper.findPostOwnerUserId(postId);

        if (receiverUserId > 0 && receiverUserId != userId ) {
            NoticeDto noticeDto = NoticeDto.builder()
                    .userId(receiverUserId)
                    .senderUserId(userId)
                    .noticeType("COMMENT")
                    .title("새 댓글")
                    .noticeMessage("회원님의 게시글에 새 댓글이 달렸습니다.")
                    .refId(postId)
                    .linkUrl("/posts/" + postId)
                    .isRead(2)
                    .status(1)
                    .build();

            noticeService.createAndPush(noticeDto);
        }

    }


}
