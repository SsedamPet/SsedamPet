/** @jsxImportSource @emotion/react */
import * as s from "./styles.js";
import { Bell } from "lucide-react";

const Header = () => {
  return (
    <header css={s.headerBar}>
      <h1 css={s.headerTitle}>멍냥일기</h1>
      <div css={s.bellIcon}>
        <Bell size={24} />
      </div>
    </header>
  );
};

export default Header;
