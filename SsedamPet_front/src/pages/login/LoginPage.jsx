/** @jsxImportSource @emotion/react */
import React from 'react';
import * as s from "./styles";
import { FcGoogle } from "react-icons/fc"; 
import { RiKakaoTalkFill } from "react-icons/ri"; 
import { SiNaver } from "react-icons/si";
import { Home, Users, Image, User } from 'lucide-react';

const LoginPage = () => {
    return (
        <div css={s.rootContainer}>
            <header css={s.headerBar}>
                <h1 css={s.headerTitle}>LOGIN</h1>
            </header>

            <main css={s.loginContent}>
                <section css={s.logoArea}>
                    <img src="/image.png" alt="logo" />
                </section>

                <section css={s.socialSection}>
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
                </section>
            </main>

            <footer css={s.bottomNavBar}>
                <div className="nav-item">
                    <div className="nav-icon"><Home size={28} /></div>
                    <span className="nav-label">홈</span>
                </div>
                <div className="nav-item">
                    <div className="nav-icon"><Users size={28} /></div>
                    <span className="nav-label">커뮤니티</span>
                </div>
                <div className="nav-item">
                    <div className="nav-icon"><Image size={28} /></div>
                    <span className="nav-label">건강기록</span>
                </div>
                <div className="nav-item active">
                    <div className="nav-icon"><User size={28} /></div>
                    <span className="nav-label">마이페이지</span>
                </div>
            </footer>
        </div>
    );
};

export default LoginPage;