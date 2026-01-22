import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar";

function CommentSection() {
  return (
    <div css={s.rootContainer}>
      {/* 1. 최상단 상단바 (피그마 3-4번 상단) */}
      <header css={s.headerBar}>
        <span css={s.headerTitle}>커뮤니티</span>
      </header>

      {/* 2. 중앙 컨텐츠 영역 */}
      <main css={s.mainContent}>
        <div css={s.commentBoxContainer}>
          {/* 박스 내부 헤더 */}
          <div css={s.commentBoxHeader}>
            <span className="box-title">댓글</span>
            <button css={s.closeButton} onClick={() => navigate("/community")}>
              <X size={16} color="#333" />
            </button>
          </div>

          {/* 스크롤되는 댓글 리스트 */}
          <div css={s.commentScrollArea}>
            <div css={s.commentWrapper}>
              <div css={s.commentItem}>
                <div css={s.avatar} />
                <div css={s.contentBox}>
                  <div className="author-info">
                    <span className="name">사용자이름</span>
                    <span className="date">2026.01.06 11:37 AM</span>
                  </div>
                  <div className="text">
                    댓글1ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
                  </div>
                  <div
                    className="reply-toggle"
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
                      <div className="text">대댓글 내용입니다.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 댓글 입력창 (박스 하단에 붙음) */}
          <div css={s.inputArea}>
            <input css={s.inputField} placeholder="댓글 입력창" />
            <button css={s.submitBtn}>작성</button>
          </div>
        </div>
      </main>

      {/* 3. 최하단 네비게이션 바 */}
      <BottomNavBar />
    </div>
  );
}

export default CommentSection;
