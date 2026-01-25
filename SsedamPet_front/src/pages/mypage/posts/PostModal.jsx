/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./styles";

const PostModal = ({ isOpen, onClose }) => {
    const posts = Array.from({ length: 12 });

    return (
        <div css={s.modalOverlay} onClick={onClose ? onClose : undefined}>
            <div css={s.container} onClick={(e) => e.stopPropagation()}>
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

                <div css={s.footerDots}>
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
            </div>
        </div>
    );
};

export default PostModal;