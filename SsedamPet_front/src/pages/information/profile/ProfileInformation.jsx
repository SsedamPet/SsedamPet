/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import { Home, Users, Image, User } from 'lucide-react'; 

const ProfileInformation = () => {
    return (
        <div css={s.rootContainer}>
            <header css={s.headerBar}>LOGO</header>

            <main css={s.content}>
                <div css={s.infoCard}>
                    {/* 피그마 중앙 정렬 가이드 준수 */}
                    <div css={s.profileUploadCircle}>
                        <span className="upload-text">이미지 추가</span>
                    </div>

                    <div css={s.buttonGroup}>
                        <button type="button" css={s.selectionButton}>앨범</button>
                        <button type="button" css={s.selectionButton}>이모티콘</button>
                    </div>

                    <button css={s.nextButton}>다음</button>
                </div>
            </main>

            <footer css={s.bottomNavBar}>
                <div className="nav-item">
                    <Home size={28} />
                    <span className="nav-label">홈</span>
                </div>
                <div className="nav-item">
                    <Users size={28} />
                    <span className="nav-label">커뮤니티</span>
                </div>
                <div className="nav-item">
                    <Image size={28} />
                    <span className="nav-label">건강기록</span>
                </div>
                <div className="nav-item active">
                    <User size={28} />
                    <span className="nav-label">마이페이지</span>
                </div>
            </footer>
        </div>
    );
};

export default ProfileInformation;