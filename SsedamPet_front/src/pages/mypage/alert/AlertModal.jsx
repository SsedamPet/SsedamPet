// src/pages/mypage/alert/AlertModal.jsx
/** @jsxImportSource @emotion/react */
import { useNavigate } from "react-router-dom";
import * as s from "./styles";

const AlertModal = () => {
  const navigate = useNavigate();

  // 닫기 버튼 클릭 시 이전 페이지 (마이페이지)로 돌아감
  const handleClose = () => {
    navigate("/mypage"); // 또는 navigate(-1)
  };

  return (
    <div css={s.modalOverlay}>
      <div css={s.modalContainer}>
       <header css={s.header}>
          <button className="close-button" onClick={handleClose}></button>
        </header>
        <div css={s.alertItem}>
          <div className="icon">✉️</div> {/* 이모티콘 또는 SVG 아이콘 */}
          <div className="content">
            <div className="message">멍냥닥터의 메시지: 반려동물에게 사료를 잘 챙겨 달라고 알림</div>
            <div className="time">12분 전</div>
          </div>
        </div>

        <div css={s.alertItem}>
          <div className="icon">✉️</div>
          <div className="content">
            <div className="message">멍냥닥터의 메시지: 정기적인 산책은 하루에 최소 1km~1.5km 하는 것...</div>
            <div className="time">17분 전</div>
          </div>
        </div>

        <div css={s.scheduleItem}>
          <div className="icon">🗓️</div>
          <div className="content">
            <div className="message">오늘(01/06)의 일정: "사료 구매" 하는 날이에요!</div>
            <div className="date">1시간 전</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;