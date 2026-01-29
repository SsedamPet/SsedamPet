/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import BottomNavBar from "../../components/layout/BottomNavBar/BottomNavBar";
import { useSearchParams } from "react-router-dom";
import { api } from "../../configs/axiosConfig";

const HealthLog = () => {

  const [searchParams] = useSearchParams();
  const petIdFromUrl = searchParams.get("petId"); // URL에서 ?petId=1 추출

  const [logData, setLogData] = useState({
    petId: petIdFromUrl ? parseInt(petIdFromUrl) : 0,
    date: new Date().toISOString().split("T")[0], // 초기값 오늘 날짜
    waterStatus: "",
    foodStatus: "",
    poopCnt: "",
    symptom: [],
    healthLogMemo: "",
  });

  const [memo, setMemo] = useState("");

  //오늘 날짜 표시 (2026.01.27 형식)
  const displayTodayDate = logData.date.replace((/-/g, "."));

  // 1-3번 버튼 선택
  const handleSelect = (option, value) => {
    setLogData((prev) => ({ ...prev, [option]: value }));
  };

  //4번 증상체크 항목
  const handleTagClick = (tag) => {
    setLogData((prev) => ({
      ...prev,
      symptom: prev.symptom.includes(tag)
        ? prev.symptom.filter((t) => t !== tag)
        : [...prev.symptom, tag],
    }));
  };

  // 메모장 자동 높이 조절 핸들러
  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setMemo(e.target.value);
  };

  // 저장 버튼 클릭 시
  const handleSubmit = async () => {
    const isWaterEmpty =
      logData.waterStatus === null || logData.waterStatus === "";
    const isFoodEmpty =
      logData.foodStatus === null || logData.foodStatus === "";
    const isPoopEmpty = logData.poopCnt === null;

    if (isWaterEmpty || isFoodEmpty || isPoopEmpty) {
      alert("필수 항목을 모두 선택해주세요!");
      return;
    }

    console.log("백엔드 전송 데이터:", logData);
    try {
      const requestData = {
        petId: logData.petId,
        writeDate: logData.date,
        waterStatus: logData.waterStatus,
        foodStatus: logData.foodStatus,
        poopCnt: logData.poopCnt,
        symptom: logData.symptom,
        healthLogMemo: logData.healthLogMemo,
      };

      const response = await api.post("/api/healthlog/", requestData);

      if (response.status === 200) {
        alert("저장이 완료되었습니다");
        console.log("DB 저장 완료");
      }
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div css={s.container}>
      <header css={s.header}>
        <div css={s.topBanner}>
          <span className="icon">📋</span>
          <span className="title">
            OO의 하루 <span className="highlight">건강 기록</span>
          </span>
        </div>
        <div css={s.datePicker}>
          <div css={s.dateBox}>
            <span className="dateText">{displayTodayDate}</span>
            <input
              type="date"
              value={logData.date}
              onChange={(e) => handleSelect("date", e.target.value)}
              css={s.hiddenDateInput}
            />
            <span className="calendarIcon">📅</span>
          </div>
        </div>
      </header>

      <main css={s.mainContent}>
        <section css={s.sectionCard}>
          <div css={s.sectionHeader}>
            <h2 css={s.sectionTitle}>1. 음수량</h2>
            <p css={s.sectionSubTitle}>오늘 물을 얼마나 마셨나요?</p>
          </div>
          <div css={s.whiteInnerBox}>
            <div css={s.buttonGrid}>
              {[0, 1, 2, 3].map((v) => (
                <button
                  key={v}
                  css={s.optionButton(logData.waterStatus === v)}
                  onClick={() => handleSelect("waterStatus", v)}
                >
                  {
                    [
                      "거의 안 마심",
                      "평소보다 적음",
                      "평소와 비슷",
                      "평소보다 많음",
                    ][v]
                  }{" "}
                  ({v})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 2. 사료 섭취량 */}
        <section css={s.sectionCard}>
          <div css={s.sectionHeader}>
            <h2 css={s.sectionTitle}>2. 사료 섭취량</h2>
            <p css={s.sectionSubTitle}>오늘 사료를 얼마나 먹었나요?</p>
          </div>
          <div css={s.whiteInnerBox}>
            <div css={s.buttonGrid}>
              {[0, 1, 2, 3].map((v) => (
                <button
                  key={v}
                  css={s.optionButton(logData.foodStatus === v)}
                  onClick={() => handleSelect("foodStatus", v)}
                >
                  {
                    [
                      "거의 안 먹음",
                      "절반 정도",
                      "대부분 다 먹음",
                      "평소보다 많음",
                    ][v]
                  }{" "}
                  ({v})
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 3. 배변 기록 */}
        <section css={s.sectionCard}>
          <div css={s.sectionHeader}>
            <h2 css={s.sectionTitle}>3. 배변 기록</h2>
            <p css={s.sectionSubTitle}>배변을 얼마나 하였나요?</p>
          </div>
          <div css={s.whiteInnerBox}>
            <div css={s.buttonGrid}>
              {["1회 이하", "1회~2회 이하", "2회~3회 이하", "4회 이상"].map(
                (label, idx) => (
                  <button
                    key={idx}
                    css={s.optionButton(logData.poopCnt === idx)}
                    onClick={() => handleSelect("poopCnt", idx)}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>
          </div>
        </section>

        {/* 4. 증상 체크 */}
        <section css={s.sectionCard}>
          <div css={s.sectionHeader}>
            <h2 css={s.sectionTitle}>4. 증상 체크</h2>
            <p css={s.sectionSubTitle}>
              특이사항을 체크하세요. (하나 이상 선택 가능)
            </p>
          </div>
          <div css={s.whiteInnerBox}>
            <div css={s.tagContainer}>
              {[
                "구토",
                "설사",
                "기침/재채기",
                "눈곱",
                "탈모",
                "가려움",
                "무기력",
              ].map((tag) => (
                <button
                  key={tag}
                  css={s.tagButton(logData.symptom.includes(tag))}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="나머지 입력하세요."
              css={s.textInput}
            />
          </div>
        </section>

        {/* 5. 메모 */}
        <section css={s.sectionCard}>
          <div css={s.sectionHeader}>
            <h2 css={s.sectionTitle}>5. 메모</h2>
            <p css={s.sectionSubTitle}>특이사항이나 메모사항을 작성해주세요.</p>
          </div>
          <div css={s.whiteInnerBox}>
            <textarea
              css={s.textArea}
              placeholder="내용을 입력하세요."
              rows="1"
              value={memo}
              onChange={handleInput}
            />
          </div>
        </section>

        <button css={s.submitButton} onClick={handleSubmit}>
          기록 저장
        </button>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default HealthLog;
