/** @jsxImportSource @emotion/react */
import * as s from "./styles"; 
import { FcGoogle } from "react-icons/fc"; 
import { RiKakaoTalkFill } from "react-icons/ri"; 
import { SiNaver } from "react-icons/si";

const LoginPage = () => {
    return (
        <div css={s.layout}>
            <div css={s.container}>
                <header css={s.header}>LOGIN</header>

                <main css={s.logoArea}>
                    <img src="/image.png" />
                </main>

                <div css={s.socialSection}>
                    <div css={s.socialText}>다른 계정으로 계속하기</div>
                    <div css={s.socialButtons}>
                        <div css={s.iconCircle} style={{background: '#F2F2F2'}}>
                             <FcGoogle size="30"/>
                        </div>
                        <div css={s.iconCircle} style={{backgroundColor: '#FEE500'}}>
                             <RiKakaoTalkFill size="30" color="#3C1E1E" />
                        </div>
                        <div css={s.iconCircle} style={{backgroundColor: '#03C75A'}}>
                             <SiNaver size="20" color="white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;