/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./styles.js"; // style.js 파일이 같은 폴더에 있어야 함
import { Home as HomeIcon, Users, Image, User, Bell } from "lucide-react"; // Home 아이콘 이름 중복 방지
import Header from "../../components/layout/Header/Header.jsx";
import BottomNav from "../../components/layout/BottomNavBar/BottomNavBar.jsx";
import BottomNavBar from "../../components/layout/BottomNavBar/BottomNavBar.jsx";

// 주간 리포트 카드 컴포넌트 (내부 헬퍼)
const WeeklyReportCard = ({ title, today, last }) => {
  const diff = today - last;

  let status = {
    class: "same",
    arrow: "─",
    message: "지난주와 같아요!",
    tip: "균형 잡힌 습관을 아주 잘 유지하고 있어요!",
    tipColor: "#656565",
    tipBg: "#F5F5F5",
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
      <div
        className="tip-box"
        style={{ backgroundColor: status.tipBg, color: status.tipColor }}
      >
        {status.tip}
      </div>
    </div>
  );
};

// 메인 Home 컴포넌트
const Home = () => {
  const [todayDate, setTodayDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const yy = String(date.getFullYear()).slice(-2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    setTodayDate(`${yy} / ${mm} / ${dd}`);
  }, []);

  const myPets = [
    { id: 1, name: "냥이 2세", gender: "♂", breed: "샴", icon: "🐱" },
    { id: 2, name: "바둑이", gender: "♀", breed: "진돗개", icon: "🐶" },
    { id: 3, name: "초코", gender: "♂", breed: "푸들", icon: "🐩" },
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

  return (
    <div css={s.rootContainer}>
        <Header />
      {/* 프로필 섹션 */}
      <section css={s.profileSection}>
        <div css={s.sliderContainer}>
          <div css={[s.sideCard, s.leftSide]}>
            <div className="avatar-mini">{getPetIndex(-1).icon}</div>
          </div>
          <div css={s.mainSliderArea}>
            <button css={s.arrowBtn} onClick={handlePrev}>
              ◀
            </button>
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
            <button css={s.arrowBtn} onClick={handleNext}>
              ▶
            </button>
          </div>
          <div css={[s.sideCard, s.rightSide]}>
            <div className="avatar-mini">{getPetIndex(1).icon}</div>
          </div>
        </div>
      </section>

      {/* 건강 기록 및 통계 섹션 */}
      <section css={s.healthRecordSection}>
        <div css={s.healthRecordBox}>
          <div css={s.recordHeader}>
            <div className="title-group">
              <span className="icon">📄</span>
              <h2>오늘의 건강기록</h2>
            </div>
            <button css={s.editBtn}>기록/수정</button>
          </div>

          <div css={s.gridContainer}>
            {[
              { icon: "💧", label: "음수량", bg: "#E3F2FD" },
              { icon: "🍴", label: "사료", bg: "#FFF3E0" },
              { icon: "💩", label: "배변", bg: "#F1F8E9" },
              { icon: "📝", label: "기타사항", bg: "#F5F5F5" },
            ].map((item, idx) => (
              <div key={idx} css={s.gridItem}>
                <div className="icon-label-wrapper">
                  <div
                    className="icon-circle"
                    style={{ backgroundColor: item.bg }}
                  >
                    {item.icon}
                  </div>
                  <span className="label">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div css={s.weeklyStatContainer}>
          <WeeklyReportCard title="일주일 동안 식사량이" today={4} last={2} />
          <WeeklyReportCard title="일주일 동안 배변 횟수" today={3} last={5} />
        </div>

        <div css={s.popularSection}>
          <div className="section-header">
            <span>📸</span> 인기 게시물
          </div>
          <div css={s.postListWrapper}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="post-item"></div>
            ))}
            <div className="more-btn">+</div>
          </div>
        </div>
      </section>
      <BottomNavBar />
    </div>
  );
};

export default Home;
