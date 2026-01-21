/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import * as s from './style.js';
import { Home, Users, Image, User } from 'lucide-react';

const WeeklyReportCard = ({ title, today, last }) => {
    const diff = today - last;
    
    let status = {
        class: "same",
        arrow: "─",
        message: "지난주와 같아요!",
        tip: "균형 잡힌 습관을 아주 잘 유지하고 있어요!",
        tipColor: "#656565", 
        tipBg: "#F5F5F5"     
    };

    const isFood = title.includes("식사");

    if (diff > 0) {
        status.class = "up";
        status.arrow = "↑";
        status.message = "늘어났어요!";
        status.tip = isFood 
            ? "활동량이 늘었나요? 갑작스런 과식은 주의해 주세요!" 
            : "배변 활동이 활발해졌네요! 장 건강이 좋아지고 있어요.";
        status.tipColor = "#2ECC71"; 
        status.tipBg = "#E8F5E9";
    } else if (diff < 0) {
        status.class = "down";
        status.arrow = "↓";
        status.message = "줄어들었어요!";
        status.tip = isFood 
            ? "식욕이 떨어졌다면 컨디션을 체크해 볼 필요가 있어요." 
            : "변비 기운이 있을 수 있어요. 음수량을 늘려주세요!";
        status.tipColor = "#FF0004"; 
        status.tipBg = "#FFF1F1";
    }

    return (
        <div css={s.weeklyCard}>
            <div className="card-content">
                <div className="title">{title}</div>
                <div className="stat-row">
                    <span className="main-num">{today}회</span>
                    <div className={`compare-group ${status.class}`}>
                        <span>({last}회)</span>
                        <span>{status.arrow}</span>
                    </div>
                </div>
                <div className={`status-msg ${status.class}`}>{status.message}</div>
            </div>
            <div className="tip-box" style={{ backgroundColor: status.tipBg, color: status.tipColor }}>
                {status.tip}
            </div>
        </div>
    );
};

const MainHomePage = () => {
    const [todayDate, setTodayDate] = useState('');

    useEffect(() => {
        const date = new Date();
        const yy = String(date.getFullYear()).slice(-2);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        setTodayDate(`${yy} / ${mm} / ${dd}`);
    }, []);

    // 정보입력 만들면 밑에 코드 수정해야됨
    const myPets = [
        { id: 1, name: "냥이 2세", gender: "♂", breed: "샴", icon: "🐱" },
        { id: 2, name: "바둑이", gender: "♀", breed: "진돗개", icon: "🐶" },
        { id: 3, name: "초코", gender: "♂", breed: "푸들", icon: "🐩" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const getPetIndex = (offset) => {
        const index = (currentIndex + offset + myPets.length) % myPets.length;
        return myPets[index];
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? myPets.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === myPets.length - 1 ? 0 : prev + 1));
    };

    const handleEditClick = () => {
        // navigate('/edit-health'); 
    };

    return (
        <div css={s.rootContainer}>
            <header css={s.headerBar}>
                <h1 css={s.headerTitle}>멍냥일기</h1>
                <div css={s.bellIcon}>
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" />
                    </svg>
                </div>
            </header>

            <section css={s.profileSection}>
                <div css={s.sliderContainer}>
                    <div css={[s.sideCard, s.leftSide]}>
                        <div className="avatar-mini">{getPetIndex(-1).icon}</div>
                    </div>
                    <div css={s.mainSliderArea}>
                        <button css={s.arrowBtn} onClick={handlePrev}>◀</button>
                        <div css={s.petInfoBox}>
                            <div css={s.dateRowInside}>
                                <span className="today-label">TODAY</span>
                                <span className="current-date">{todayDate}</span>
                            </div>
                            <div css={s.contentRow}>
                                <div css={s.avatarCircle}>{getPetIndex(0).icon}</div>
                                <div css={s.textInfo}>
                                    <div className="name-row">
                                        {getPetIndex(0).name} <span>{getPetIndex(0).gender}</span>
                                    </div>
                                    <div className="breed-row">품종: {getPetIndex(0).breed}</div>
                                </div>
                            </div>
                        </div>
                        <button css={s.arrowBtn} onClick={handleNext}>▶</button>
                    </div>
                    <div css={[s.sideCard, s.rightSide]}>
                        <div className="avatar-mini">{getPetIndex(1).icon}</div>
                    </div>
                </div>
            </section>

            <section css={s.healthRecordSection}>
                <div css={s.healthRecordBox}>
                    <div css={s.recordHeader}>
                        <div className="title-group">
                            <span className="icon">📄</span>
                            <h2>오늘의 건강기록</h2>
                        </div>
                        <button css={s.editBtn} onClick={handleEditClick}>기록/수정</button>
                    </div>

                    <div css={s.gridContainer}>
                        <div css={s.gridItem}>
                            <div className="icon-label-wrapper">
                                <div className="icon-circle" style={{ backgroundColor: '#E3F2FD' }}>💧</div>
                                <span className="label">음수량</span>
                            </div>
                        </div>
                        <div css={s.gridItem}>
                            <div className="icon-label-wrapper">
                                <div className="icon-circle" style={{ backgroundColor: '#FFF3E0' }}>🍴</div>
                                <span className="label">사료</span>
                            </div>
                        </div>
                        <div css={s.gridItem}>
                            <div className="icon-label-wrapper">
                                <div className="icon-circle" style={{ backgroundColor: '#F1F8E9' }}>💩</div>
                                <span className="label">배변</span>
                            </div>
                        </div>
                        <div css={s.gridItem}>
                            <div className="icon-label-wrapper">
                                <div className="icon-circle" style={{ backgroundColor: '#F5F5F5' }}>📝</div>
                                <span className="label">기타사항</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div css={s.weeklyStatContainer}>
                    <WeeklyReportCard 
                        title="일주일 동안 식사량이" 
                        today={4} 
                        last={2} 
                    />
                    <WeeklyReportCard 
                        title="일주일 동안 배변 횟수" 
                        today={3} 
                        last={5} 
                    />
                </div>

                <div css={s.popularSection}>
                    <div className="section-header">
                        <span>📸</span> 인기 게시물
                    </div>
                    <div css={s.postListWrapper}>
                        <div className="post-item"></div>
                        <div className="post-item"></div>
                        <div className="post-item"></div>
                        <div className="post-item"></div>
                        <div className="more-btn">+</div>
                    </div>
                </div>
            </section>

            <div css={s.bottomNavBar}>
                <div className="nav-item active">
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
            <div className="nav-item">
                <div className="nav-icon"><User size={28} /></div>
                <span className="nav-label">마이페이지</span>
            </div>
        </div>
    </div>
    );
};

export default MainHomePage;