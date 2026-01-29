import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MainCommunity() {
  const navigate = useNavigate();
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isLatest, setIsLatest] = useState(true);

  return (
    <div css={s.rootContainer}>
      <div css={s.filterRow}>
        <div css={s.headerTab}>
          <button css={s.tabButton(isLatest)} onClick={() => setIsLatest(true)}>
            최신순
          </button>
          <button
            css={s.tabButton(!isLatest)}
            onClick={() => setIsLatest(false)}
          >
            인기순
          </button>
        </div>
        <button
          css={s.writeTextButton}
          onClick={() => navigate("/community/write")}
        >
          글 작성하기
        </button>
      </div>

      <main css={s.content}>
        <div css={s.postCard}>
          <div css={s.userInfo}>
            <div css={s.profileImg}></div>
            <div css={s.userDetail}>
              <span className="userName">사용자 이름</span>
              <span className="postTime">방금 전</span>
            </div>
          </div>

          <div css={s.postImage}></div>

          <div css={s.postText}>
            <p className="description">
              우리 집 강아지 너무 귀엽죠? 산책 다녀왔어요!
            </p>
            <p className="hashtags">#멍스타그램 #강아지 #산책</p>
          </div>

          <div css={s.interactionBar}>
            <div css={s.statItem}>
              <Heart size={20} fill="black" />
              <span>12</span>
            </div>
            <div
              css={s.statItem}
              onClick={() => setIsCommentOpen(true)}
              style={{ cursor: "pointer", position: "relative", zIndex: 10 }}
            >
              <MessageSquare size={20} />
              <span>5</span>
            </div>
          </div>
        </div>
      </main>

      {/* X 클릭해서 모달 창 닫기 */}
      {isCommentOpen && (
        <div css={s.modalOverlay} onClick={() => setIsCommentOpen(false)}>
          <div css={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <div css={s.modalHeader}>
              <span>댓글</span>
              <X
                size={24}
                onClick={() => {
                  setIsCommentOpen(false);
                }}
              />
            </div>
            <div css={s.modalBody}>
              <CommentSection />
            </div>
          </div>
        </div>
      )}

      <button css={s.floatingButton}>
        <Plus size={32} color="#AAA" />
      </button>
    </div>
  );
}

export default MainCommunity;
