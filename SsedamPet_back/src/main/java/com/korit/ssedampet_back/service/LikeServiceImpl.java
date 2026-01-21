package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.response.main.NoticeDto;
import com.korit.ssedampet_back.mapper.LikeMapper;
import com.korit.ssedampet_back.mapper.PostMapper;
import com.korit.ssedampet_back.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LikeServiceImpl implements LikeService {

    private final LikeMapper likeMapper;
    private final PostMapper postMapper;
    private final NoticeService noticeService;

    @Override
    @Transactional
    public boolean toggleLike(int userId, int postId) {
        // 1. 좋아요 테이블 확인 (LikeMapper 사용)
        int count = likeMapper.existsByUserIdAndPostId(userId, postId);

        if (count > 0) {
            // 2. 이미 있다면 취소 로직
            likeMapper.deleteLike(userId, postId);
            postMapper.updateLikeCount(postId, -1); // post_tb 숫자 감소
            return false;
        }
        // 3. 없다면 추가 로직
        likeMapper.insertLike(userId, postId);
        postMapper.updateLikeCount(postId, 1);  // post_tb 숫자 증가

        int receiverUserId = likeMapper.findPostOwnerUserId(postId);

        if (receiverUserId > 0 && receiverUserId != userId) {
            NoticeDto notice = NoticeDto.builder()
                    .userId(receiverUserId)          // receiver
                    .senderUserId(userId)            // sender
                    .noticeType("LIKE")
                    .title("좋아요")
                    .noticeMessage("회원님의 게시글에 좋아요가 눌렸습니다.")
                    .refId(postId)
                    .linkUrl("/posts/" + postId)
                    .isRead(0)
                    .status(1)
                    .build();

            noticeService.createAndPush(notice);
        }
        return true;
    }
    }

