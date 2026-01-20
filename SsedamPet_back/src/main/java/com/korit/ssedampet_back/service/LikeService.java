package com.korit.ssedampet_back.service;

public interface LikeService {

    boolean toggleLike(int userId, int postId); // 좋아요 상태 확인
}
