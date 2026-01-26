/** @jsxImportSource @emotion/react */
import { Bell, Heart, MessageSquare, Plus, Search } from "lucide-react";
import * as s from "./styles"; 

function CommunityMain() {
  return (
    <div css={s.rootContainer}>
      <div css={s.filterRow}>
        <div css={s.headerTab}>
          <button css={s.tabButton(true)}>최신순</button>
          <button css={s.tabButton(false)}>인기순</button>
        </div>
        <button css={s.writeTextButton}>글 작성하기</button>
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
            <p className="description">우리 집 강아지 너무 귀엽죠? 산책 다녀왔어요!</p>
            <p className="hashtags">#멍스타그램 #강아지 #산책</p>
          </div>

          <div css={s.interactionBar}>
            <div css={s.statItem}>
              <Heart size={20} fill="black" />
              <span>12</span>
            </div>
            <div css={s.statItem}>
              <MessageSquare size={20} />
              <span>5</span>
            </div>
          </div>
        </div>
      </main>

      <button css={s.floatingButton}>
        <Plus size={32} color="#AAA" />
      </button>
    </div>
  );
}

export default CommunityMain;