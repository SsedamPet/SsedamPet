package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.response.main.NoticeDto;
import com.korit.ssedampet_back.mapper.CommentMapper;
import com.korit.ssedampet_back.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final PostMapper postMapper;
    private final NoticeService noticeService;
    private final CommentMapper commentMapper;

    @Transactional
    public void createComment(int userId, int postId, String content) {

        commentMapper.insertComment(userId, postId, content); // 댓글 저장

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
