/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import CommentSection from "../Comment/CommentSection";
import * as s from "./styles";
import * as commonS from "../MainCommunity/styles"; // 기존 유저정보/이미지 스타일 재사용

function PostDetailPage() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/community/post/${postId}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("AccessToken")}` }
                });
                setPost(response.data);
            } catch (error) {
                console.error("로드 실패:", error);
                navigate("/community");
            }
        };
        fetchPostDetail();
    }, [postId]);

    if (!post) return null;

    return (
        <div css={s.rootContainer}>
            {/* 상단 헤더 - 뒤로가기 */}
            <header css={s.header}>
                <button onClick={() => navigate(-1)}>
                    <ChevronLeft size={24} />
                    <span>뒤로가기</span>
                </button>
            </header>

            <main css={s.content}>
                {/* 1. 피드 카드 영역 */}
                <article css={s.postCard}>
                    <div css={commonS.userInfo}>
                        <img src={`http://localhost:8080${post.postImgUrl}`} alt="프로필" css={commonS.profileImg} />
                        <div css={commonS.userDetail}>
                            <span className="userName">{post.nickname}</span>
                            <span className="postTime">{new Date(post.createdDt).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div css={commonS.postImage}>
                        <img src={`http://localhost:8080${post.postImgUrl}`} alt="게시글" css={commonS.postImgTag} />
                    </div>

                    <div css={commonS.postText}>
                        <p className="description">{post.postContent}</p>
                        <p className="hashtags">{post.postLocationTag}</p>
                    </div>
                </article>

                {/* 2. 댓글 영역 (별도 카드 형태) */}
                <section css={s.commentWrapper}>
                    <CommentSection postId={postId} />
                </section>
            </main>
        </div>
    );
}

export default PostDetailPage;