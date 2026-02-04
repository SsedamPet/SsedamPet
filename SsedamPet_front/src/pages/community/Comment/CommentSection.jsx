/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as s from "./styles";

function CommentSection({ postId }) {
    const navigate = useNavigate();
    const [showReplies, setShowReplies] = useState({});
    const [isReplyMode, setIsReplyMode] = useState(null); // 부모 댓글 ID 저장
    const [inputValue, setInputValue] = useState("");
    const [comments, setComments] = useState([]);

    // 1. 댓글 목록 불러오기 (백엔드 연결)
    const fetchComments = async () => {
        try {
            const token = localStorage.getItem("AccessToken");
            const response = await axios.get(`http://localhost:8080/api/community/post/${postId}/comments`, {
                headers: { Authorization: `Bearer ${token}` } // 조회할 때도 토큰이 필요할 수 있습니다.
            });
            setComments(response.data);
        } catch (error) {
            console.error("댓글 로딩 실패", error);
        }
    };

    useEffect(() => {
        if (postId) fetchComments();
    }, [postId]);

    const handleKeyDown = (e) => {
        if (inputValue === "" && e.key === "Backspace") {
            setIsReplyMode(null);
        }
    };

    // 2. 댓글/답글 등록 (백엔드 연결)
    const handleSubmit = async () => {
        if (inputValue.trim() === "") return;

        const token = localStorage.getItem("AccessToken");
        // 백엔드 CommentController의 Map<String, Object> 구조에 맞춤
        const commentData = {
            content: inputValue,
            parentCommentId: isReplyMode ? isReplyMode : null // 답글이면 부모 ID, 아니면 null
        };

        try {
            await axios.post(`http://localhost:8080/api/community/post/${postId}/comments`, commentData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setInputValue("");
            setIsReplyMode(null);
            fetchComments(); // 등록 후 목록 새로고침
        } catch (error) {
            console.error("댓글 등록 실패", error);
            alert("댓글 등록에 실패했습니다.");
        }
    };

    const toggleReplies = (commentId) => {
        setShowReplies(prev => ({ ...prev, [commentId]: !prev[commentId] }));
    };

    // 백엔드 데이터는 평면 구조(Flat)로 올 수 있으므로,
    // 화면 표시를 위해 부모 댓글만 필터링하는 로직이 필요할 수 있습니다.
    const parentComments = comments.filter(c => c.depth === 0);
    const getReplies = (parentId) => comments.filter(c => c.parentCommentId === parentId);

    return (
        <div css={s.rootContainer}>
            <main css={s.mainContent}>
                <div css={s.commentBoxContainer}>
                    <div css={s.commentScrollArea}>
                        {parentComments.length === 0 ? (
                            <div css={s.emptyMessage}>아직 작성된 댓글이 없습니다.</div>
                        ) : (
                            parentComments.map((comment) => (
                                <div css={s.commentWrapper} key={comment.commentId}>
                                    <div
                                        css={[s.commentItem, isReplyMode === comment.commentId && { backgroundColor: "#f9f9f9"}]}
                                        onClick={() => setIsReplyMode(comment.commentId)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {/* profileImg -> userProfileImgUrl 로 변경 */}
                                        <img css={s.avatar} src={comment.userProfileImgUrl || "/default.png"} alt="프로필" />
                                        <div css={s.contentBox}>
                                            <div className="author-info">
                                                <span className="name">{comment.nickname}</span>
                                                <span className="date">{new Date(comment.createdDt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="text">{comment.content}</div>
                                            <div
                                                className="reply-toggle"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleReplies(comment.commentId);
                                                }}
                                            >
                                                답글 {showReplies[comment.commentId] ? "숨기기" : `더보기 (${getReplies(comment.commentId).length})`}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 대댓글 영역 */}
                                    {showReplies[comment.commentId] && (
                                        <div css={s.replyList}>
                                            {getReplies(comment.commentId).map((reply) => (
                                                <div css={s.replyItem} key={reply.commentId}>
                                                    <img
                                                        css={s.avatar}
                                                        style={{ width: "25px", height: "25px" }}
                                                        src={reply.userProfileImgUrl || "/default.png"}
                                                    />
                                                    <div css={s.contentBox}>
                                                        <div className="author-info">
                                                            <span className="name">{reply.nickname}</span>
                                                            <span className="date">{new Date(reply.createdDt).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="text">{reply.content}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {/* 입력창 영역 */}
                    <div css={s.inputArea}>
                        <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
                            {isReplyMode && (
                                <div style={{ fontSize: "11px", color: "#556B2F", marginBottom: "4px", paddingLeft: "10px" }}>
                                    @{comments.find(c => c.commentId === isReplyMode)?.nickname} 님에게 답글 작성 중...
                                </div>
                            )}
                            <input
                                css={s.inputField}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={isReplyMode ? "답글을 입력하세요... (백스페이스로 취소)" : "댓글을 입력하세요..."}
                            />
                        </div>
                        <button
                            css={[s.submitBtn, inputValue.trim().length > 0 && s.submitBtnActive]}
                            disabled={inputValue.trim().length === 0}
                            onClick={handleSubmit}
                        >
                            작성
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default CommentSection;