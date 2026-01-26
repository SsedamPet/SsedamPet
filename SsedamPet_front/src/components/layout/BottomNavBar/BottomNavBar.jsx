/** @jsxImportSource @emotion/react */
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, MessageSquare, User } from 'lucide-react';
import * as s from "./styles";

const BottomNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로가 해당 메뉴인지 확인하는 함수
  const isActive = (path) => location.pathname === path;

  return (
    <nav css={s.navContainer}>
      <div css={s.navItem} onClick={() => navigate('/')}>
        <Home size={24} color={isActive('/') ? "#333" : "#AAA"} />
        <span css={s.navText(isActive('/'))}>홈</span>
      </div>
      
      <div css={s.navItem} onClick={() => navigate('/search')}>
        <Search size={24} color={isActive('/search') ? "#333" : "#AAA"} />
        <span css={s.navText(isActive('/search'))}>검색</span>
      </div>

      <div css={s.navItem} onClick={() => navigate('/community')}>
        <MessageSquare size={24} color={isActive('/community') ? "#333" : "#AAA"} />
        <span css={s.navText(isActive('/community'))}>커뮤니티</span>
      </div>

      <div css={s.navItem} onClick={() => navigate('/profile')}>
        <User size={24} color={isActive('/profile') ? "#333" : "#AAA"} />
        <span css={s.navText(isActive('/profile'))}>프로필</span>
      </div>
    </nav>
  );
};

export default BottomNavBar;