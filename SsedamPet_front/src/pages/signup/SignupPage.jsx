/** @jsxImportSource @emotion/react */
import { useState } from "react";
import axios from "axios"; 
import * as s from "./style";
import { Home, Users, Image, User } from 'lucide-react'; 

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "", 
        email: "",      
        birthDate: "",
        phone: "",
        nickname: "",
        profileImage: null
    });

    const handleNicknameCheck = async () => {
        if (!formData.nickname) {
            alert("닉네임을 입력해주세요.");
            return;
        }
        try {
            const response = await axios.get(`/api/check-nickname?nickname=${formData.nickname}`);
            alert(response.data.message || "사용 가능한 닉네임입니다.");
        } catch (error) {
            alert("이미 사용 중인 닉네임입니다.");
        }
    };

    const handleSubmit = async () => {
        try {
            await axios.post("/api/signup", formData);
            alert("회원가입이 완료되었습니다!");
        } catch (error) {
            alert("입력 정보를 다시 확인해주세요.");
        }
    };

    return (
        <div css={s.rootContainer}>
            <div css={s.container}> 
                <header css={s.headerBar}>LOGO</header>

                <main css={s.content}>
                    <div css={s.inputRow}>
                        <span css={s.label}>이름</span>
                        <input css={s.fixedInput} value={formData.name} readOnly />
                    </div>

                    <div css={s.inputRow}>
                        <span css={s.label}>이메일</span>
                        <input css={s.fixedInput} value={formData.email} readOnly />
                    </div>

                    <div css={s.inputRow}>
                        <span css={s.label}>생년월일</span>
                        <input 
                            css={s.inputBox} 
                            value={formData.birthDate}
                            onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                        />
                    </div>

                    <div css={s.inputRow}>
                        <span css={s.label}>휴대전화</span>
                        <input 
                            css={s.inputBox} 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                    </div>

                    <div css={s.inputRow}>
                        <span css={s.label}>닉네임</span>
                        <div css={s.nicknameWrapper}>
                            <input 
                                css={s.nicknameInput} 
                                value={formData.nickname}
                                onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                            />
                            <button css={s.checkButton} onClick={handleNicknameCheck}>중복확인</button>
                        </div>
                    </div>

                    <div css={s.profileRow}>
                        <span css={s.label}>프로필</span>
                        <div css={s.profileCircleArea}>
                            <div css={s.profileCircle}>이미지 추가</div>
                        </div>
                    </div>
                </main>

                <button css={s.submitButton} onClick={handleSubmit}>회원가입</button>
            </div>

            <div css={s.bottomNavBar}>
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
            </div>
        </div>
    );
};

export default SignupPage;