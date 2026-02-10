/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const handleSocialLogin = (provider) => {
        window.location.href = `${BASE_URL}/oauth2/authorization/${provider}`;
    };

    return (
        <div css={s.rootContainer}>
            <section css={s.logoArea}>
                <img src="/image.png" alt="logo" />
            </section>
            <section css={s.socialSection}>
                <div css={s.socialText}>다른 계정으로 계속하기</div>
                <div css={s.socialButtons}>
                    <div
                        css={s.iconCircle}
                        style={{ background: "#F2F2F2" }}
                        onClick={() => handleSocialLogin("google")}
                    >
                        <FcGoogle size="20" />
                    </div>
                    <div
                        css={s.iconCircle}
                        style={{ backgroundColor: "#FEE500" }}
                        onClick={() => handleSocialLogin("kakao")}
                    >
                        <RiKakaoTalkFill size="20" color="#3C1E1E" />
                    </div>
                    <div
                        css={s.iconCircle}
                        style={{ backgroundColor: "#03C75A" }}
                        onClick={() => handleSocialLogin("naver")}
                    >
                        <SiNaver size="20" color="white" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;
