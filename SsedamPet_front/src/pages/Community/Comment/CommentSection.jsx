/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as s from "./styles"; 

function CommentSection() {
  const navigate = useNavigate();
  const [showReplies, setShowReplies] = useState(false);
  const [isReplyMode, setIsReplyMode] = useState(false);
  const [inputValue, setInputValue] = useState(""); // 입력값 제어

  const handleKeyDown = (e) => {
      // 입력창에 아무것도 없고 벡스페이스 누르면 대댓글 모드 취소
      if (inputValue === "" && e.key === "Backspace") {
          setIsReplyMode(false);
          }
      }

  const handleSubmit = () => {
      // 내용 없으면 작동 안 함!!
    if (inputValue.trim() === "") return;

    // 확인용 알람
    alert(isReplyMode ? "대댓글이 작성되었습니다!" : "댓글이 작성되었습니다!");

    // 뭐든 달면 텍스트 박스 비우기
    setInputValue("");
    setIsReplyMode(false);
  };

  return (
    <div css={s.rootContainer}>
      <main css={s.mainContent}>
        <div css={s.commentBoxContainer}>
          {/* 스크롤되는 댓글 리스트 */}
          <div css={s.commentScrollArea}>
            <div css={s.commentWrapper}>
              <div css={s.commentItem}
              onClick={() => setIsReplyMode(true)}
              style={{ cursor: "pointer" }}>
                <div css={s.avatar} />
                <div css={s.contentBox}>
                  <div className="author-info">
                    <span className="name">사용자이름</span>
                    <span className="date">2026.01.06 11:37 AM</span>
                  </div>
                  <div className="text">
                    댓글1 내용이 표시되는 영역입니다.
                  </div>
                  <div
                    className="reply-toggle"
                    style={{ cursor: "pointer", color: "#558B2F", fontSize: "12px", marginTop: "5px" }}
                    onClick={() => setShowReplies(!showReplies)}
                  >
                    답글 {showReplies ? "숨기기" : "더보기"}
                  </div>
                </div>
              </div>

              {/* 대댓글 (답글 더보기 클릭 시) */}
              {showReplies && (
                <div css={s.replyList}>
                  <div css={s.replyItem}>
                    <div
                      css={s.avatar}
                      style={{ width: "30px", height: "30px" }}
                    />
                    <div css={s.contentBox}>
                        <div className="author-info">
                            <span className="name">대댓글사용자이름</span>
                            <span className="date">2026.01.06 11:37 AM</span>
                        </div>
                      <div className="text">대댓글 내용이 표시되는 영역입니다.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 댓글 입력창 (박스 하단) */}
          <div css={s.inputArea}>
            <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
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