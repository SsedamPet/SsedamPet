// src/pages/mypage/alert/styles.js
import { css } from "@emotion/react";

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검은색 배경 */
  backdrop-filter: blur(4px); /* 배경 흐림 효과 */
  display: flex;
  justify-content: center;
  align-items: flex-start; /* 상단에서 시작하도록 조정 */
  padding-top: 50px; /* 상단 여백 */
  z-index: 9999; /* 다른 요소 위에 표시 */
`;

export const modalContainer = css`
  width: 90%;
  max-width: 480px; 
  height: 778px;
  background-color: #EDFCE0; /* 연두색 배경 */
  border-radius: 50px;
  padding: 25px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const header = css`
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px 0 0;

  .close-button {
    cursor: pointer;
    background-color: transparent; /* 배경은 투명하게 */
    border: 1.5px solid #000000; 
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0;

    /* X 아이콘을 만들기 위한 가상 요소 (얇은 선) */
    &::before, &::after {
      content: '';
      position: absolute;
      width: 15px; /* X의 길이 */
      height: 1.5px; /* X의 두께 (얇게) */
      background-color: #000000; /* X의 색상 */
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
`;

export const alertItem = css`
  background-color: #FFFDF9;
  border-radius: 50px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 10px;

  .icon {
    font-size: 1.8em;
    background-color: #D4EDDA; 
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  .content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .message {
      font-size: 0.9em;
      line-height: 1.4;
    }

    .time {
      font-size: 12px;
      color: #969696;
      margin-top: 5px;
    }
  }
`;

export const scheduleItem = css`
  ${alertItem} 
  
  .icon {
    background-color: #FFE6CC; /* 스케줄 아이콘 배경색 (주황 계열) */
  }

  .message {
    font-weight: bold;
    color: #D9534F; 
  }

  .date {
    font-size: 12px;
    color: #969696;
  }
`;