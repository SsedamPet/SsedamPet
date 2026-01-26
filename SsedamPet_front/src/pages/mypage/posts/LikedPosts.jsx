/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./styles";

const LikedPosts = ({ isOpen, onClose }) => {
    // PostModal과 동일하게 12개의 그리드 박스 생성
    const posts = Array.from({ length: 12 });

    return (
        <div css={s.modalOverlay} onClick={onClose ? onClose : undefined}>
            <div css={s.container} onClick={(e) => e.stopPropagation()}>
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