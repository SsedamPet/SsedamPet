import { Bell, Heart, MessageSquare, Plus, Search } from "lucide-react";
import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar";

function CommunityMain() {
  return (
    <div css={s.rootContainer}>
      <header css={s.headerBar}>
        <div css={s.topRow}>
          <span css={s.title}>커뮤니티</span>
          <div css={s.iconGroup}>
            <Search size={22} strokeWidth={2.5} />
            <Bell size={22} strokeWidth={2.5} />
          </div>
        </div>
      </header>
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
              <span css={s.userName}></span>
              <span css={s.postTime}></span>
            </div>
          </div>

          <div css={s.postImage}></div>

          <div css={s.postText}>
            <p className="description"></p>
            <p className="hashtags"></p>
          </div>

          <div css={s.interactionBar}>
            <div css={s.statItem}>
              <Heart size={20} fill="black" />
              <span></span>
            </div>
            <div css={s.statItem}>
              <MessageSquare size={20} />
              <span></span>
            </div>
          </div>
        </div>
      </main>

      <button css={s.floatingButton}>
        <Plus size={32} color="#AAA" />
      </button>

      <BottomNavBar />
    </div>
  );
}

export default CommunityMain;
