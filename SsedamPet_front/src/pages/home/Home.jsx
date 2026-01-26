/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./styles.js"; // style.js 파일이 같은 폴더에 있어야 함
import { Home as HomeIcon, Users, Image, User, Bell } from "lucide-react"; // Home 아이콘 이름 중복 방지
import BottomNav from "../../components/layout/BottomNavBar/BottomNavBar.jsx";
import BottomNavBar from "../../components/layout/BottomNavBar/BottomNavBar.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../configs/axiosConfig.js";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [todayDate, setTodayDate] = useState("");

  const yyyyMMdd = new Date().toISOString().slice(0, 10);

  // 백엔드 조회 API 연결
  const [dashboardData, setDashboardData] = useState({
    myPets: [],
    todayHealthLog: {
      healthlogId: 0,
      waterStatus: "-",
      foodStatus: "-",
      poopCnt: 0,
    },
    weeklySummary: {
      foodThisWeek: 0,
      foodLastWeek: 0,
      poopThisWeek: 0,
      poopLastWeek: 0,
    },
    popularPosts: [],
  });

// Home.jsx 상단 useEffect 부분을 아래 하나로 통합

useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get("accessToken"); // 백엔드 소문자 파라미터

    const handleLoginAndFetch = async () => {
        // 1. URL에 토큰이 들어왔다면 무조건 최우선 저장
        if (tokenFromUrl) {
            localStorage.setItem("AccessToken", tokenFromUrl);
            console.log("URL 토큰 발견 및 저장 완료");
            
            // 저장 직후 주소창 세탁 (navigate 후에 바로 다음 로직으로 안 넘어가게 return)
            navigate("/", { replace: true });
            return; 
        }

        // 2. 이제 지갑(LocalStorage)에서 토큰을 꺼냄
        const savedToken = localStorage.getItem("AccessToken");

        // 3. 토큰이 확실히 있을 때만 대시보드 API 호출
        if (savedToken && savedToken !== "null") {
            try {
                console.log("대시보드 데이터 조회 시작...");
                const response = await api.get("/api/main/dashboard");
                setDashboardData(response.data);
                console.log("데이터 로드 성공:", response.data);
            } catch (error) {
                console.error("대시보드 조회 실패 (401 등):", error);
                // 만약 토큰이 만료(401)되었다면 지갑 비우기
                if (error.response?.status === 401) {
                    localStorage.removeItem("AccessToken");
                }
            }
        }
    };

    handleLoginAndFetch();
}, [location.search, navigate]); // 주소창 파라미터가 바뀔 때(로그인 완료 시) 감지

  // TODAY 라벨용 (yy / MM / dd)
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

  // 현재 선택된 펫 인덱스
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

  const currentPet = getPetIndex(0);

  // 오늘 기록 요약(백엔드 todayHealthLog 사용)
  const todayLog = dashboardData.todayHealthLog ?? {
    waterStatus: "-",
    foodStatus: "-",
    poopCnt: 0,
  };

  // 주간 요약(없으면 0)
  const weekly = dashboardData.weeklySummary ?? {
    foodThisWeek: 0,
    foodLastWeek: 0,
    poopThisWeek: 0,
    poopLastWeek: 0,
  };

  return (
    <div css={s.rootContainer}>
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
            <button
              css={s.editBtn}
              onClick={() =>
                navigate(
                  `/healthlog?petId=${getPetIndex(0).id}&date=${yyyyMMdd}`,
                )
              }
            >
              기록/수정
            </button>
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
            <div className="more-btn" onClick={() => navigate("/community")}>
              +
            </div>
          </div>
        </div>
      </section>
      <BottomNavBar />
    </div>
  );
};

export default Home;
