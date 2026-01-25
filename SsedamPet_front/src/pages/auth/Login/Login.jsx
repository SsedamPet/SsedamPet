/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { Home, Users, Image, User } from "lucide-react";
import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar.jsx";

function Login() {
  return (
    <div css={s.rootContainer}>
      <header css={s.headerBar}>
      </header>

      <main css={s.loginContent}>
        <section css={s.logoArea}>
          <img src="/image.png" alt="logo" />
        </section>
        <section css={s.socialSection}>
          <div css={s.socialText}>다른 계정으로 계속하기</div>
          <div css={s.socialButtons}>
            <div css={s.iconCircle} style={{ background: "#F2F2F2" }}>
              <FcGoogle size="20" />
            </div>
            <div css={s.iconCircle} style={{ backgroundColor: "#FEE500" }}>
              <RiKakaoTalkFill size="20" color="#3C1E1E" />
            </div>
            <div css={s.iconCircle} style={{ backgroundColor: "#03C75A" }}>
              <SiNaver size="20" color="white" />
            </div>
          </div>
        </section>
      </main>
      <BottomNavBar />
    </div>
  );
}

export default Login;
