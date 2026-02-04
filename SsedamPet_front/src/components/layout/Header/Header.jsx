/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./styles";
import { useNotice } from "../../../contexts/NoticeContext";
import NoticeModal from "../../../pages/mypage/notice/NoticeModal";
import { Bell } from "lucide-react";

const Header = () => {
  const [noticeOpen, setNoticeOpen] = useState(false);

  const { unreadCount } = useNotice();

  return (
    <header css={s.headerBar}>
      <h1 css={s.headerTitle}>쓰담펫</h1>
      <div
        css={s.noticeBellInCard}
        onClick={() => setNoticeOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setNoticeOpen(true);
        }}
      >
        <Bell size={26} color="#131210" />
        <NoticeModal open={noticeOpen} onClose={() => setNoticeOpen(false)} />

        {unreadCount > 0 && <span css={s.noticeBadge}>{unreadCount}</span>}
      </div>
    </header>
  );
};

export default Header;
