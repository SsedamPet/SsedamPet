/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import * as s from "./styles.js";
// import { Home as HomeIcon, Users, Image, User, Bell } from "lucide-react";
import BottomNavBar from "../../components/layout/BottomNavBar/BottomNavBar.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../configs/axiosConfig.js";
import usePetStore from "../../stores/usePetStore.js";
import { Bell } from "lucide-react";
import { useNotice } from "../../contexts/NoticeContext.jsx";
import NoticeModal from "../mypage/notice/NoticeModal.jsx";

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
                <div className={`status-msg ${status.class}`}>
                    {status.message}
                </div>
            </div>

            <div
                className="tip-box"
                style={{
                    backgroundColor: status.tipBg,
                    color: status.tipColor,
                }}
            >
                {status.tip}
            </div>
        </div>
    );
};

// 메인 Home 컴포넌트
function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [todayDate, setTodayDate] = useState("");
    const [weeklyData, setWeeklyData] = useState(null);

    const [noticeOpen, setNoticeOpen] = useState(false);

    // const { unreadCount /*, setUnreadCount */ } = useNotice();

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

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get("accessToken"); // 백엔드 소문자 파라미터

        const handleLoginAndFetch = async () => {
            if (tokenFromUrl) {
                localStorage.setItem("AccessToken", tokenFromUrl);
                console.log("URL 토큰 저장 완료");

                // 저장 직후 주소창 세탁 (navigate 후에 바로 다음 로직으로 안 넘어가게 return)
                navigate("/", { replace: true });
                return;
            }

            const savedToken = localStorage.getItem("AccessToken");

            // 3. 토큰이 확실히 있을 때만 대시보드 API 호출
            if (savedToken && savedToken !== "null") {
                try {
                    // console.log("대시보드 데이터 조회 시작...");
                    const response = await api.get("/api/main/dashboard");
                    setDashboardData(response.data);
                    console.log("데이터 로드 성공:", response.data);
                } catch (error) {
                    console.error("대시보드 조회 실패:", error);
                }
            }
        };

        handleLoginAndFetch();
    }, [location.search, navigate]); // 주소창 파라미터가 바뀔 때(로그인 완료 시) 감지

    //===========================펫 슬라이더=========================================

    // TODAY 라벨용 (yy / MM / dd)
    useEffect(() => {
        const date = new Date();
        const yy = String(date.getFullYear()).slice(-2);
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        setTodayDate(`${yy} / ${mm} / ${dd}`);
    }, []);

    const { setPet } = usePetStore();
    // 현재 선택된 펫 인덱스
    const [currentIndex, setCurrentIndex] = useState(0);

    const myPets =
        dashboardData?.myPets?.length > 0 ? dashboardData?.myPets : [];
    // const myPets = Array.isArray(dashboardData?.myPets) ? dashboardData.myPets : [];

    const getPetIndex = (offset) => {
        if (myPets.length === 0)
            return {
                petName: "등록된 펫 없음",
                icon: "🐾",
                petGender: "",
                petBreed: "",
            };
        const index = (currentIndex + offset + myPets.length) % myPets.length;
        return myPets[index];
    };

    const getPetIcon = (type) => {
        // console.log("가져온 petType 값:", type);
        return type === "CAT" ? "🐱" : "🐶";
    };

    const getGenderIcon = (gender) => {
        if (gender === "M") return "♂";
        if (gender === "F") return "♀";
        return "";
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? myPets.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === myPets.length - 1 ? 0 : prev + 1));
    };

    const currentPet = getPetIndex(0);

    useEffect(() => {
        if (currentPet && currentPet.petId) {
            //전역에 펫 ID, 이름 저장
            setPet(currentPet.petId, currentPet.petName);
            console.log("전역 상태 업데이트:", currentPet.petName);
        }
    }, [currentIndex, currentPet, setPet]);

    //===========================건강기록=========================================

    useEffect(() => {
        const loadPetHealthLog = async () => {
            const savedToken = localStorage.getItem("AccessToken");

            //토큰 X / 슬라이더 선택된 펫 ID 없으면 중지
            if (!savedToken || !currentPet?.petId) return;

            try {
                console.log(
                    `${currentPet.petName} 의 기록 조회중.. ID: ${currentPet.petId}`,
                );

                const response = await api.get("/api/healthlog/today", {
                    params: {
                        petId: currentPet.petId,
                        writeDate: yyyyMMdd,
                    },
                });

                const healthData = response.data;
                if (healthData) {
                    setDashboardData((prev) => ({
                        ...prev,
                        todayHealthLog: healthData,
                    }));
                    console.log("건강기록 교체 완료:", healthData);
                } else {
                    //데이터 없으면 초기화
                    setDashboardData((prev) => ({
                        ...prev,
                        todayHealthLog: {
                            waterStatus: "-",
                            foodStatus: "-",
                            poopCnt: 0,
                            healthLogMemo: "-",
                        },
                    }));
                }
            } catch (error) {
                console.log("건강기록 조회 실패:", error);
                //초기화 - 빈 화면 방지용
                setDashboardData((prev) => ({
                    ...prev,
                    todayHealthLog: {
                        waterStatus: "-",
                        foodStatus: "-",
                        poopCnt: 0,
                        healthLogMemo: "-",
                    },
                }));
            }
        };

        loadPetHealthLog();
    }, [currentPet.petId, yyyyMMdd]); //펫Id 나 날짜 바뀔때마다 실행

    // 오늘 기록 요약(백엔드 todayHealthLog 사용)
    const todayLog = dashboardData.todayHealthLog ?? {
        waterStatus: "-",
        foodStatus: "-",
        poopCnt: 0,
        healthLogMemo: "-",
    };

    //=========================== 건강기록 주간 요약 =========================================

    useEffect(() => {
        const loadWeeklyReport = async () => {
            if (!currentPet.petId) return;

            try {
                const response = await api.get(
                    `/api/healthlog/weekly/${currentPet.petId}`,
                );
                setWeeklyData(response.data);
                console.log("주간 리포트 조회 성공:", response.data);
            } catch (error) {
                console.log("주간 리포트 조회 실패:", error);
            }
        };
        loadWeeklyReport();
    }, [currentPet.petId]); //펫 슬라이더 넘길 때마다 갱신

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
                        <div className="avatar-mini">
                            {getPetIcon(getPetIndex(-1).petType)}
                        </div>
                    </div>
                    <div css={s.mainSliderArea}>
                        <button css={s.arrowBtn} onClick={handlePrev}>
                            ◀
                        </button>
                        <div css={s.petInfoBox}>
                            <div css={s.dateRowInside}>
                                <span className="today-label">TODAY</span>
                                <span className="current-date">
                                    {todayDate}
                                </span>
                            </div>
                            <div css={s.contentRow}>
                                <div css={s.avatarCircle}>
                                    {getPetIcon(getPetIndex(0).petType)}
                                </div>
                                <div css={s.textInfo}>
                                    <div className="name-row">
                                        {getPetIndex(0).petName}{" "}
                                        <span>
                                            {getGenderIcon(
                                                getPetIndex(0).petGender,
                                            )}
                                        </span>
                                    </div>
                                    <div className="breed-row">
                                        품종:{" "}
                                        {getPetIndex(0).petBreed || "정보없음"}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button css={s.arrowBtn} onClick={handleNext}>
                            ▶
                        </button>
                    </div>
                    <div css={[s.sideCard, s.rightSide]}>
                        <div className="avatar-mini">
                            {getPetIcon(getPetIndex(1).petType)}
                        </div>
                    </div>
                </div>
            </section>

            {/* 건강 기록 및 통계 섹션 */}
            {/* 펫 바뀔때마다 섹션 전체를 초기화하고 새로 그림 */}
            <section css={s.healthRecordSection} key={currentPet.petId}>
                <div css={s.healthRecordBox}>
                    <div css={s.recordHeader}>
                        <div className="title-group">
                            <span className="icon">📄</span>
                            <h2>오늘의 건강기록</h2>
                        </div>
                        <button
                            css={s.editBtn}
                            onClick={() => {
                                // currentPet에 선택된 petId 전달 -> 페이지 이동
                                if (currentPet && currentPet.petId) {
                                    navigate(
                                        `/healthlog?petId=${currentPet.petId}&date=${yyyyMMdd}`,
                                    );
                                } else {
                                    alert("선택된 반려동물 정보가 없습니다.");
                                }
                            }}
                        >
                            기록/수정
                        </button>
                    </div>

                    <div css={s.gridContainer}>
                        {[
                            {
                                icon: "💧",
                                label: "음수량",
                                value: todayLog.waterStatus,
                                bg: "#E3F2FD",
                            },
                            {
                                icon: "🍴",
                                label: "사료",
                                value: todayLog.foodStatus,
                                bg: "#FFF3E0",
                            },
                            {
                                icon: "💩",
                                label: "배변",
                                value: todayLog.poopCnt + "회",
                                bg: "#F1F8E9",
                            },
                            {
                                icon: "📝",
                                label: "기타사항",
                                value: todayLog.healthlogMemo,
                                bg: "#F5F5F5",
                            },
                        ].map((item, idx) => (
                            <div key={idx} css={s.gridItem}>
                                <div className="icon-label-wrapper">
                                    <div
                                        className="icon-circle"
                                        style={{ backgroundColor: item.bg }}
                                    >
                                        {item.icon}
                                    </div>
                                    <div className="display-text">
                                        <span className="label">
                                            {item.label}
                                        </span>
                                        <span
                                            className="value"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            {item.value}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div css={s.weeklyStatContainer}>
                    {weeklyData ? (
                        <>
                            <WeeklyReportCard
                                title="일주일 동안 식사량이"
                                today={weeklyData.thisWeek.avgFoodScore.toFixed(
                                    1,
                                )}
                                last={weeklyData.lastWeek.avgFoodScore.toFixed(
                                    1,
                                )}
                            />
                            <WeeklyReportCard
                                title="일주일 동안 배변 횟수"
                                today={weeklyData.thisWeek.avgPoopCnt.toFixed(
                                    1,
                                )}
                                last={weeklyData.lastWeek.avgPoopCnt.toFixed(1)}
                            />
                        </>
                    ) : (
                        <p>데이터 계산 중..</p>
                    )}
                </div>

                <div css={s.popularSection}>
                    <div className="section-header">
                        <span>📸</span> 인기 게시물
                    </div>
                    <div css={s.postListWrapper}>
                        {/* 백엔드에서 가져온 실시간 인기 게시물 */}
                        {dashboardData.popularPosts &&
                        dashboardData.popularPosts.length > 0
                            ? dashboardData.popularPosts.map((post) => (
                                  <div
                                      key={post.postId}
                                      className="post-item"
                                      onClick={() =>
                                          navigate(
                                              `/community/post/${post.postId}`,
                                          )
                                      }
                                      style={{
                                          backgroundImage: `url(${post.postImgUrl})`, // DB의 이미지 URL 연결
                                          backgroundSize: "cover",
                                          backgroundPosition: "center",
                                          cursor: "pointer",
                                      }}
                                  ></div>
                              ))
                            : /* 데이터가 없을 때 */
                              [1, 2, 3, 4].map((i) => (
                                  <div
                                      key={i}
                                      className="post-item"
                                      style={{ backgroundColor: "#f0f0f0" }}
                                  ></div>
                              ))}
                        <div
                            className="more-btn"
                            onClick={() => navigate("/community")}
                        >
                            +
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
