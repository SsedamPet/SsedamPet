/** @jsxImportSource @emotion/react */
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ClipboardList, MessageSquare, User } from "lucide-react";
import * as s from "./styles";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 해당 메뉴인지 확인하는 함수
  const isActive = (path) => location.pathname === path;

  return (
    <nav css={s.navContainer}>
      <div css={s.navItem} onClick={() => navigate("/")}>
        <Home size={24} color={isActive("/") ? "#333" : "#AAA"} />
        <span css={s.navText(isActive("/"))}>홈</span>
      </div>

      <div css={s.navItem} onClick={() => navigate("/healthlog")}>
        <ClipboardList
          size={24}
          color={isActive("/healthlog") ? "#333" : "#AAA"}
        />
        <span css={s.navText(isActive("/healthlog"))}>건강기록</span>
      </div>

      <div css={s.navItem} onClick={() => navigate("/community")}>
        <MessageSquare
          size={24}
          color={isActive("/community") ? "#333" : "#AAA"}
        />
        <span css={s.navText(isActive("/community"))}>커뮤니티</span>
      </div>

      <div css={s.navItem} onClick={() => navigate("/mypage")}>
        <User size={24} color={isActive("/mypage") ? "#333" : "#AAA"} />
        <span css={s.navText(isActive("/mypage"))}>마이페이지</span>
      </div>
    </nav>
  );
};

export default BottomNavBar;
