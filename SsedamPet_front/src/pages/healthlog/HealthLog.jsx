/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import BottomNavBar from "../../components/layout/BottomNavBar/BottomNavBar";

const HealthLog = () => {
  const [memo, setMemo] = useState("");

  // 메모장 자동 높이 조절 핸들러
  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setMemo(e.target.value);
  };

  return (
    <div css={s.container}>
      <header css={s.header}>
        <div css={s.topBanner}>
          <span className="icon">📋</span>
          <span className="title">OO의 하루 <span className="highlight">건강 기록</span></span>
        </div>
        <div css={s.datePicker}>
          <div css={s.dateBox}>
            <span className="dateText">2026.01.02 - 오늘 날짜</span>
            <input type="date" defaultValue="2026-01-02" css={s.hiddenDateInput} />
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
            <button css={s.optionButton}>거의 안 마심 (0)</button>
            <button css={s.optionButton}>평소보다 적음 (1)</button>
            <button css={s.optionButton}>평소와 비슷 (2)</button>
            <button css={s.optionButton}>평소보다 많음 (3)</button>
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
              <button css={s.optionButton}>거의 안 먹음 (0)</button>
              <button css={s.optionButton}>절반 정도 (1)</button>
              <button css={s.optionButton}>대부분 다 먹음 (2)</button>
              <button css={s.optionButton}>평소보다 많음 (3)</button>
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
              <button css={s.optionButton}>1회 이하</button>
              <button css={s.optionButton}>1회~2회 이하</button>
              <button css={s.optionButton}>2회~3회 이하</button>
              <button css={s.optionButton}>4회 이상</button>
            </div>
          </div>
      </section>  

      {/* 4. 증상 체크 */}
      <section css={s.sectionCard}>
        <div css={s.sectionHeader}>
          <h2 css={s.sectionTitle}>4. 증상 체크</h2>
          <p css={s.sectionSubTitle}>특이사항을 체크하세요. (하나 이상 선택 가능)</p>
        </div>
          <div css={s.whiteInnerBox}>
            <div css={s.tagContainer}>
              {['구토', '설사', '기침/재채기', '눈곱', '탈모', '가려움', '무기력'].map(tag => (
            <button key={tag} css={s.tagButton}>{tag}</button>
          ))}
        </div>
          <input type="text" placeholder="나머지 입력하세요." css={s.textInput} />
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

        <button css={s.submitButton}>기록 저장</button>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default HealthLog;