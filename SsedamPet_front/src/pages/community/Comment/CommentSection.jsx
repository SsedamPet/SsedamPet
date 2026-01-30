/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as s from "./styles"; 

function CommentSection({ postId }) {
  const navigate = useNavigate();
  const [showReplies, setShowReplies] = useState({}); // 개별 댓글 ID
  const [isReplyMode, setIsReplyMode] = useState(null);
  const [inputValue, setInputValue] = useState(""); // 입력값 제어
  const [comments, setComments] = useState([]);

  useEffect (() => { // 전체 댓글 데이터(json) 가져와서 현재 보고 있는 게시글(postId)만 필터링. 게시글 바뀌면 댓글 다시 불러옴
      const fetchComments = async () => {
          try {
              const response = await axios.get("/data/comments.json");
              const filtered = response.data.filter(c => c.postId === postId);
              setComments(filtered);
          } catch (error) {
              console.error("댓글 로딩 실패", error);
          }
      };
      fetchComments();
  }, [postId]);

  const handleKeyDown = (e) => {
      // 입력창에 아무것도 없고 벡스페이스 누르면 대댓글 모드 취소
      if (inputValue === "" && e.key === "Backspace") {
          setIsReplyMode(false);
          }
      }

  const handleSubmit = () => {
      // 내용 없으면 작동 안 함!!
    if (inputValue.trim() === "") return;
    // 임시 데이터용
    const newComment = {
        id: Date.now(), // 임시 ID
        userName: "나(User)",
        profileImg: "https://via.placeholder.com/40",
        content: inputValue,
        data: new Date().toLocaleString(),
        replies: []
        };

    if (isReplyMode) {
        // 대댓글 모드에서 부모 댓글 찾아 replies 배열에 추가
        setComments(prev => prev.map(c =>
            c.id === isReplyMode
            ? { ...c, replies: [...(c.replies || []), newComment] }
            : c
            ));
        // 대댓글 작성 시 자동으로 해당 답글 펼치기
        setShowReplies(prev => ({ ...prev, [isReplyMode]: true}));
        } else {
            setComments(prev => [...prev, { ...newComment, postId }]);
        }
    // 뭐든 달면 텍스트 박스 비우기
    setInputValue("");
    setIsReplyMode(null);
  };

  const toggleReplies = (commentId) => {
      setShowReplies(prev => ({
          ...prev,
          [commentId]: !prev[commentId]
          }));
      };

  return (
    <div css={s.rootContainer}>
      <main css={s.mainContent}>
        <div css={s.commentBoxContainer}>
          {/* 스크롤되는 댓글 리스트 */}
          <div css={s.commentScrollArea}>
              {comments.length === 0 ? (
                  <div css={s.emptyMessage}>아직 작성된 댓글이 없습니다.</div>
              ) : (
          comments.map((comment) => ( // 부모 댓글
            <div css={s.commentWrapper} key={comment.id}>
              <div css={[s.commentItem, isReplyMode === comment.id && { backgroundColor: "#f9f9f9"}]} // 작성 중인 댓글 강조
              onClick={() => setIsReplyMode(comment.id)}
              style={{ cursor: "pointer" }}>
                <div css={s.avatar} style={{ backgroundImage: `url(${comment.profileImg})` }}/>
                <div css={s.contentBox}>
                  <div className="author-info">
                    <span className="name">{comment.userName}</span>
                    <span className="date">{comment.date}</span>
                  </div>
                  <div className="text"> {comment.content}
                  </div>
                  <div
                    className="reply-toggle"
                    style={{ cursor: "pointer", color: "#558B2F", fontSize: "12px", marginTop: "5px" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleReplies(comment.id);
                    }}
                  >
                    답글 {showReplies[comment.id] ? "숨기기" : `더보기 (${comment.replies?.length || 0})`}
                  </div>
                </div>
              </div>

              {/* 대댓글 (답글 더보기 클릭 시) */}
              {showReplies[comment.id] && comment.replies && (
                <div css={s.replyList} style={{ marginLeft: "40px", borderLeft: "2px solid #eee" }}>
                    {comment.replies.map((reply) => (
                  <div css={s.replyItem} key={reply.id} style={{ padding: "8px 12px" }}>
                    <div
                      css={s.avatar}
                      style={{ width: "25px", height: "25px", backgroundImage: `url(${reply.profileImg})` }}
                    />
                    <div css={s.contentBox}>
                        <div className="author-info">
                            <span className="name">{reply.userName}</span>
                            <span className="date">{reply.date}</span>
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

          {/* 댓글 입력창 (박스 하단) */}
          <div css={s.inputArea}>
            <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
                {isReplyMode && (
                    <div style={{ fontSize: "11px", color: "#5558B2F", marginBottom: "4px", paddingLeft: "10px" }}>
                        @{comments.find(c => c.id === isReplyMode)?.userName} 님에게 답글 작성 중...
                    </div>
                    )}
                <input
                    css={s.inputField}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown} // 키 이벤트 연결
                            placeholder={
                              isReplyMode
                                ? "대댓글을 입력하세요... (벡스페이스로 취소)"
                                : "댓글을 입력하세요..."
                            }
                          />
            </div>
            <button css={[s.submitBtn, inputValue.trim().length > 0 && s.submitBtnActive]}
                disabled={inputValue.trim().length === 0}
                onClick={handleSubmit}>작성</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CommentSection;