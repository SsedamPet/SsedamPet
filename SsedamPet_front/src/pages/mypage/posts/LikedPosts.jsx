/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./styles";

const LikedPosts = ({ isOpen, onClose }) => {
    // PostModal과 동일하게 12개의 그리드 박스 생성
    const posts = Array.from({ length: 12 });

    return (
        <div css={s.modalOverlay} onClick={onClose ? onClose : undefined}>
            <div css={s.container} onClick={(e) => e.stopPropagation()}>
                {/* 1. 이 부분을 추가했습니다 (PostModal의 네비게이션 스타일) */}
                <div css={s.monthNav}>
                    <span style={{ color: '#C2F49B', cursor: 'pointer', fontSize: '17px' }}>◀</span>
                    <span style={{ margin: '0 15px' }}>2026 / 01</span>
                    <span style={{ color: '#C2F49B', cursor: 'pointer', fontSize: '17px' }}>▶</span>
                </div>

                <div css={s.postListContainer}>
                    {posts.map((_, index) => (
                        <div key={index} css={s.postItem} />
                    ))}
                </div>

                {/* 하단 점 표시 (...) */}
                <div css={s.footerDots}>
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
            </div>
        </div>
    );
};

export default LikedPosts;