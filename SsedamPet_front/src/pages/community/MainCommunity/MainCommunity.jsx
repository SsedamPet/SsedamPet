/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import axios from "axios";
import { Bell, Heart, MessageSquare, Plus, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as s from "./styles";
import Header from "../../../components/layout/Header/Header";
import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar";
import CommentSection from "../Comment/CommentSection";

function CommunityMain() {
    const navigate = useNavigate();
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [isLatest, setIsLatest] = useState(true);
    // 게시글 현재 상태 / 게시글 로딩 상태
    const [posts, setPosts] = useState([]); // 화면에 보여줄 데이터
    const [allPosts, setAllPosts] = useState([]); // 데이터 전체
    const [loading, setLoading] = useState(true);

    // 데이터 불러오기
    useEffect(() => {
        const fetchPosts = async () => {
            try { // data/posts.json 불러옴
                const response = await axios.get("/data/posts.json");
                // 방금 쓴 새 글이 있나 확인
                const savedNewPost = localStorage.getItem("newPost");

                if (savedNewPost) {
                    const newPost = JSON.parse(savedNewPost);
                    // 최상단에 새 글 배치
                    fetchedData = [newPost, ...fetchedData];
                    localStorage.removeItem("newPost"); // 새로고침하면 제거됨
                }
                setAllPosts(response.data);
                setPosts(response.data.slice(0, 3)); // 3개만 나오도록 나중엔 "/api/posts?limit=3"
                } catch (error) {
                    console.error("로드 실패: ", error);
                } finally {
                    setLoading(false);
                }
            };
        fetchPosts();
    }, []);

    {/* 좋아요 눌렀으면 -1 되고 처음 눌렀으면 +1 되는거 */}
    const handleLike = (postId) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) => {
                if (post.id === postId) {
                    const isAdding = !post.isLiked;
                    return {
                        ...post,
                        isLiked: isAdding,
                        likes: isAdding ? post.likes + 1 : post.likes -1
                        };
                    }
                return post;
                })
            );
        };
    // posts 배열 데이터를 복제해
    const handleLoadMore = () => {
        const currentLength = posts.length; // 현재 화면에 보이는 데이터 수
        const totalLength = allPosts.length; // 전체 데이터 수

        if (currentLength >= totalLength) {
            alert("마지막 게시글입니다.");
            return;
        }

    const nextPosts = allPosts.slice(currentLength, currentLength + 3);

    setPosts([...posts, ...nextPosts]);
    };

    const sortedPosts = [...posts].sort((a, b) => {
        if (isLatest) {
            return b.id - a.id;
        } else {
            return b.likes - a.likes;
            }
        });

  return (
    <div css={s.rootContainer}>
      <div css={s.filterRow}>
        <div css={s.headerTab}>
          <button css={s.tabButton(isLatest)} onClick={() => setIsLatest(true)}>최신순</button>
          <button css={s.tabButton(!isLatest)} onClick={() => setIsLatest(false)}>인기순</button>
        </div>
        <button css={s.writeTextButton}
        onClick={() => navigate("/community/write")}>글 작성하기</button>
      </div>

      <main css={s.content}>
          {sortedPosts.map((post) => (
            <div css={s.postCard} key={post.id}>
              <div css={s.userInfo}>
                  <img src={post.profileImg} alt={`${post.userName}님의 프로필`} css={s.profileImg} />
                <div css={s.userDetail}>
                  <span className="userName">{post.userName}</span>
                  <span className="postTime">{post.postTime}</span>
                </div>
              </div>

              <div css={s.postImage}>
                  <img src={post.postImage} alt="게시글 이미지" css={s.postImgTag} />
                    </div>

              <div css={s.postText}>
                <p className="description">{post.description}</p>
                <p className="hashtags">{post.hashtags}</p>
              </div>

          <div css={s.interactionBar}>
            <div css={s.statItem} onClick={() => handleLike(post.id)} style={{ cursor: "pointer" }}>
              <Heart size={20}
              fill={post.isLiked ? "#FF0000" : "none"}
              stroke={post.isLiked ? "#FF0000" : "black"} />
              <span>{post.likes}</span>
            </div>
            <div css={s.statItem}
                onClick={() => {
                    setSelectedPostId(post.id);
                    setIsCommentOpen(true)}}
                    style={{ cursor: "pointer", position: "relative", zIndex: 10 }}>
              <MessageSquare size={20} />
              <span>{post.commentsCount}</span>
            </div>
            </div>
          </div>
        ))}
        <div css={s.loadMoreContainer}>
            <button css={s.loadMoreButton} onClick={handleLoadMore}>
                피드 더보기
            </button>
        </div>
      </main>

    {/* X 클릭해서 모달 창 닫기 */}
    {isCommentOpen && (
        <div css={s.modalOverlay} onClick={() => setIsCommentOpen(false)}>
            <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
                <div css={s.modalHeader}>
                  <span>댓글</span>
                  <X size={24} onClick={() => {setIsCommentOpen(false);}} />
                </div>
                <div css={s.modalBody}>
                  <CommentSection postId={selectedPostId} />
                </div>
            </div>
        </div>
    )}

      <button css={s.floatingButton}>
        <Plus size={32} color="#AAA" />
      </button>
      <BottomNavBar />
    </div>
  );
}

export default CommunityMain;