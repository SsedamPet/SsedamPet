/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import { Home, Users, Image, User } from 'lucide-react'; 

const PetInformation = () => {
    const [petType, setPetType] = useState(""); 
    const [petName, setPetName] = useState("");

    return (
        <div css={s.rootContainer}>
            <header css={s.headerBar}>LOGO</header>

            <main css={s.content}>
                <div css={s.infoCard}>
                    <h2 css={s.stepTitle}>1. 반려동물 종류</h2>
                    
                    <div css={s.buttonGroup}>
                        <button 
                            css={s.typeButton(petType === "dog")} 
                            onClick={() => setPetType("dog")}
                        >
                            강아지
                        </button>
                        <button 
                            css={s.typeButton(petType === "cat")} 
                            onClick={() => setPetType("cat")}
                        >
                            고양이
                        </button>
                    </div>

                    <div css={s.inputSection}>
                        <input 
                            css={s.nameInput} 
                            placeholder="이름" 
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                        />
                    </div>

                    <button css={s.nextButton}>다음</button>
                </div>
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

export default PetInformation;