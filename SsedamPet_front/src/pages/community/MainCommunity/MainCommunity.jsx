/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import axios from "axios";
import { Heart, MessageSquare, X, Trash2 } from "lucide-react"; // Trash2 추가 확인
import { useNavigate } from "react-router-dom";
import * as s from "./styles";
import Header from "../../../components/layout/Header/Header";
import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar";
import CommentSection from "../Comment/CommentSection";

function MainCommunity() {
    const navigate = useNavigate();
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [isLatest, setIsLatest] = useState(true);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setCurrentUserId(Number(storedUserId));
        }
        fetchPosts();
    }, [isLatest]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const sortBy = isLatest ? "latest" : "popular";
            const response = await axios.get(`http://localhost:8080/api/community/posts?sortBy=${sortBy}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("AccessToken")}` }
            });
            setPosts(response.data);
        } catch (error) {
            console.error("데이터 로드 실패: ", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/community/post/${postId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("AccessToken")}` }
            });
            alert("삭제되었습니다.");
            setPosts(prevPosts => prevPosts.filter(post => post.postId !== postId));
        } catch (error) {
            alert(error.response?.data || "삭제 중 오류가 발생했습니다.");
        }
    };

    const handleLike = async (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.postId === postId
                    ? {
                        ...post,
                        likeState: post.likeState === 1 ? 0 : 1,
                        postLikeCnt: post.likeState === 1 ? post.postLikeCnt - 1 : post.postLikeCnt + 1
                    }
                    : post
            )
        );
        try {
            await axios.post(`http://localhost:8080/api/community/post/${postId}/like`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("AccessToken")}` }
            });
        } catch (error) {
            fetchPosts();
        }
    };

    return (
        <div css={s.rootContainer}>
            <div css={s.filterRow}>
                <div css={s.headerTab}>
                    <button css={s.tabButton(isLatest)} onClick={() => setIsLatest(true)}>최신순</button>
                    <button css={s.tabButton(!isLatest)} onClick={() => setIsLatest(false)}>인기순</button>
                </div>
                <button css={s.writeTextButton} onClick={() => navigate("/community/write")}>글 작성하기</button>
            </div>

            <main css={s.content}>
                {posts.map((post) => (
                    <div css={s.postCard} key={post.postId}>
                        {/* 1. 상단 유저 정보 및 삭제 버튼 영역 */}
                        <div css={s.userInfo} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img
                                    src={post.userProfileImgUrl
                                        ? post.userProfileImgUrl.startsWith('http')
                                            ? post.userProfileImgUrl
                                            : `http://localhost:8080${post.userProfileImgUrl.startsWith('/') ? '' : '/'}${post.userProfileImgUrl}`
                                        : "/default-profile.png"}
                                    alt="프로필"
                                    css={s.profileImg}
                                    onError={(e) => { e.target.src = "/default-profile.png"; }}
                                />
                                <div css={s.userDetail}>
                                    <span className="userName">{post.nickname}</span>
                                    <span className="postTime">{new Date(post.createdDt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            {/* [수정] 삭제 버튼 구조 정렬 */}
                            {post.userId === currentUserId && (
                                <button
                                    onClick={() => handleDeletePost(post.postId)}
                                    style={{ background: 'none', border: 'none', color: '#ff4d4f', cursor: 'pointer', padding: '5px' }}
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div> {/* userInfo 끝 */}

                        {/* 2. 게시글 이미지 영역 */}
                        <div css={s.postImage}
                             onClick={() => navigate(`/community/post/${post.postId}`)}
                             style={{ cursor: "pointer" }}
                        >
                            {post.postImgUrl && (
                                <img
                                    src={`http://localhost:8080${post.postImgUrl.startsWith('/') ? '' : '/'}${post.postImgUrl}`}
                                    alt="게시글"
                                    css={s.postImgTag}
                                />
                            )}
                        </div>

                        {/* 3. 게시글 텍스트 영역 */}
                        <div css={s.postText}>
                            <p className="description">{post.postContent}</p>
                            <p className="hashtags">{post.postLocationTag}</p>
                        </div>

                        {/* 4. 하단 인터랙션 바 */}
                        <div css={s.interactionBar}>
                            <div css={s.statItem} onClick={() => handleLike(post.postId)} style={{ cursor: "pointer" }}>
                                <Heart
                                    size={20}
                                    fill={post.likeState === 1 ? "#ff4d4f" : "none"}
                                    color={post.likeState === 1 ? "#ff4d4f" : "currentColor"}
                                />
                                <span style={{ color: post.likeState === 1 ? "#ff4d4f" : "inherit" }}>
                                    {post.postLikeCnt}
                                </span>
                            </div>

                            <div css={s.statItem}
                                 onClick={() => {
                                     setSelectedPostId(post.postId);
                                     setIsCommentOpen(true);
                                 }}
                                 style={{ cursor: "pointer", position: "relative", zIndex: 10 }}>
                                <MessageSquare size={20} />
                                <span>{post.postCommentCnt}</span>
                            </div>
                        </div>
                    </div> // postCard 끝
                ))}
            </main>

            {isCommentOpen && (
                <div css={s.modalOverlay} onClick={() => setIsCommentOpen(false)}>
                    <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div css={s.modalHeader}>
                            <span>댓글</span>
                            <X size={24} onClick={() => setIsCommentOpen(false)} style={{ cursor: "pointer" }} />
                        </div>
                        <div css={s.modalBody}>
                            <CommentSection postId={selectedPostId} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainCommunity;