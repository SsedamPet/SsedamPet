/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { Home, Users, Image as ImageIcon, User, Bell, Plus, X } from 'lucide-react'; 

const PostWrite = () => {
    return (
        <div css={s.rootContainer}>
            <header css={s.headerBar}>
                <div css={s.topRow}>
                    <span css={s.title}>게시물 작성</span>
                    <div css={s.bellIcon}>
                        <Bell size={24} strokeWidth={2.5} color="white" />
                    </div>
                </div>
            </header>

            <main css={s.content}>
                <div css={s.closeButton}>
                    <X size={24} strokeWidth={2.5} color="#333" />
                </div>
                
                <select css={s.inputField}>
                    <option value="">펫 선택하기</option>
                </select>

                <div css={s.imageUploadBox}>
                    <Plus size={40} color="#999" />
                </div>

                <textarea 
                    css={s.textAreaField} 
                    placeholder="본문 내용 작성"
                />

                <button css={s.submitButton}>작성 완료</button>
            </main>

            <footer css={s.bottomNavBar}>
                <div css={s.navItem}><Home size={28} /><span>홈</span></div>
                <div css={[s.navItem, s.active]}><Users size={28} /><span>커뮤니티</span></div>
                <div css={s.navItem}><ImageIcon size={28} /><span>건강기록</span></div>
                <div css={s.navItem}><User size={28} /><span>마이페이지</span></div>
            </footer>
        </div>
    );
};

export default PostWrite;