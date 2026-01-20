package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.mapper.LikeMapper;
import com.korit.ssedampet_back.service.LikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    private LikeMapper likeMapper;

    @Override
    @Transactional // DB 수정 작업이므로 트랜잭션 처리를 권장합니다??
    public boolean toggleLike(int userId, int postId) {
        int count = likeMapper.existsByUserIdAndPostId(userId, postId);

        if (count > 0) {
            likeMapper.deleteLike(userId, postId);
            return false;
        } else {
            likeMapper.insertLike(userId, postId);
            return true;
        }
    }
}
