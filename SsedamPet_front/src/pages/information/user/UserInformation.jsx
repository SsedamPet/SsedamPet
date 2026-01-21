/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react";
import * as s from "./style";
import { Home, Users, Image, User, Calendar } from 'lucide-react'; 

const PetDetails = () => {
    const [petInfo, setPetInfo] = useState({
        name: "냥이",
        birthDate: "2026-01-21",
        gender: "male",
        breed: "샴",
        weight: "5"
    });

    const dateInputRef = useRef(null);

    const handleCalendarClick = () => {
        dateInputRef.current.showPicker();
    };

    return (
        <div css={s.rootContainer}>
            <header css={s.headerBar}>LOGO</header>

            <main css={s.content}>
                <div css={s.infoCard}>
                    <div css={s.profileImageCircle}></div>

                    <div css={s.formList}>
                        <div css={s.inputRow}>
                            <label css={s.label}>이름</label>
                            <input css={s.textInput} value={petInfo.name} readOnly />
                        </div>

                        <div css={s.inputRow}>
                            <label css={s.label}>생년월일</label>
                            <div css={s.dateWrapper}>
                                <input 
                                    type="date"
                                    ref={dateInputRef}
                                    css={s.hiddenDateInput}
                                    onChange={(e) => setPetInfo({...petInfo, birthDate: e.target.value})}
                                />
                                <div css={s.dateDisplay}>{petInfo.birthDate}</div>
                                <Calendar css={s.calendarIcon} size={24} onClick={handleCalendarClick} />
                            </div>
                        </div>

                        <div css={s.inputRow}>
                            <label css={s.label}>성별</label>
                            <div css={s.genderGroup}>
                                <button css={s.genderButton(petInfo.gender === 'male')}>
                                    <div className="dot" /> 남아
                                </button>
                                <button css={s.genderButton(petInfo.gender === 'female')}>
                                    <div className="dot" /> 여아
                                </button>
                            </div>
                        </div>

                        <div css={s.inputRow}>
                            <label css={s.label}>품종</label>
                            <input css={s.textInput} value={petInfo.breed} readOnly />
                        </div>

                        <div css={s.inputRow}>
                            <label css={s.label}>체중</label>
                            <input css={s.textInput} value={`${petInfo.weight} (kg)`} readOnly />
                        </div>
                    </div>

                    <button css={s.completeButton}>완료</button>
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

export default PetDetails;