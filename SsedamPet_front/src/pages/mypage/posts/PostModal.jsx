/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./styles";
import { useNavigate } from "react-router-dom";
import { useMyPostsQuery } from "../../../react-query/queries/mypagePostsQueries";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";

const API_BASE_URL = "http://localhost:8080";

const PostModal = ({ isOpen, onClose }) => {
    
    const navigate = useNavigate();
    const token = localStorage.getItem("AccessToken");

    const { data: posts = [], isLoading } = useMyPostsQuery(!!token);

    const openCommunity = () => {
        onClose?.();
        navigate("/community");
    };

    return (
        <div css={s.modalOverlay} onClick={onClose}>
            <div css={s.container} onClick={(e) => e.stopPropagation()}>
                <div css={s.monthNav}>
                    <span style={{ color: '#C2F49B', cursor: 'pointer', fontSize: '17px' }}>◀</span>
                    <span style={{ margin: '0 15px' }}>2026 / 01</span>
                    <span style={{ color: '#C2F49B', cursor: 'pointer', fontSize: '17px' }}>▶</span>
                </div>

                <div css={s.postListContainer}>
                    {isLoading ? (
                        <div>불러오는중...</div>
                    ) : (
                        posts.slice(0, 12).map((p) => {
                            const imgUrl = resolveImageUrl(p.postImgUrl, API_BASE_URL);
                            return (
                                <div key={p.postId} css={s.postItem}>
                                    {imgUrl ? <img src={imgUrl} alt="" css={s.postImg}></img> : null}
                                </div>
                            )
                        })
                    )}
                </div>

                <div css={s.footerDots} onClick={openCommunity}>
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                </div>
            </div>
        </div>
    );
};

export default PostModal;