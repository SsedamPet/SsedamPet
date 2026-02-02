import { css } from "@emotion/react";

export const modalOverlay = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5) !important; 
  backdrop-filter: blur(4px);
  display: flex; 
  justify-content: center; 
  align-items: flex-start;
  padding-top: 50px;
  z-index: 9999;
`;

export const modalContainer = css`
  width: 479px; 
  height: 715px;
  background-color: #EDFCE0; 
  border-radius: 50px;
  padding: 60px 20px 25px 20px;
  position: relative;
  box-sizing: border-box;
`;

export const closeButton = css`
  position: absolute;
  top: 15px; 
  right: 20px;
  background: none; 
  width: 28px;
  height: 28px; 
  border-radius: 50%;
  display: flex;
  align-items: center; 
  justify-content: center;
  cursor: pointer;
`;

export const section = css`
  background-color: #C2F49B; 
  border-radius: 20px;
  padding: 18px 15px;
  margin-bottom: 15px;
  
  
  label {
    display: block; 
    font-size: 20px; 
    font-weight: 400px; 
    color: #6B6B6B; 
    margin-bottom: 12px;

    span { 
      font-size: 9px; 
      margin-left: 5px; 
    }
  }
`;

export const buttonGroup = css`
  display: flex; 
  gap: 8px;

  button {
    flex: 1; 
    padding: 10px;
    border-radius: 13px; 
    border: none;
    font-size: 12px; 
    color: #888;
  }
`;

export const inputRow = css`
  display: flex; 
  gap: 10px;

  .input-box {
    flex: 1;

    span { 
      display: block; 
      font-size: 12px; 
      margin-bottom: 5px; 
      color: #6B6B6B; 
    }

    input { 
      width: 100%; 
      padding: 10px; 
      border-radius: 13px; 
      border: none; 
      background: #FFFFFF;
      font-size: 12px; 
      box-sizing: border-box; 
      }
  }
`;

export const photoSection = css`
  display: flex; 
  gap: 18px; 
  align-items: center; 
`;



export const infoInputs = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .input-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .input-item > span {
    font-size: 12px;
    color: #2d4028;
    font-weight: 700;
  }

  .input-item input {
  width: 100%;
  max-width: 250px;     /* ✅ 추가: 오른쪽 영역에서 넘치지 않게 */
  box-sizing: border-box; /* ✅ 추가 */
  height: 38px;
  border-radius: 12px;
  border: none;
  padding: 0 12px;
  outline: none;
  }

`;

export const footerButtons = css`
  display: flex; 
  gap: 15px;
  margin-top: 5px;

  button {
    flex: 1;
    padding: 12px; 
    border-radius: 20px; 
    border: none; 
    font-weight: bold; 
    font-size: 15px;

    &.delete { 
      background-color: #B7F2C9; 
    }

    &.save { 
      background-color: #B7F2C9; 
    }
  }
  
`;

export const selectedButton = css`
  font-weight: 700 !important;
  opacity: 1 !important;
  border: 2px solid #2D4028 !important;
  background: #ffffff !important;
  color: #2D4028 !important;
`;

export const unSelectedButton = css`
  font-weight: 400 !important;
  opacity: 0.6 !important;
  border: 1px solid rgba(0,0,0,0.15) !important;
  background: #ffffff !important;
  color: #888 !important;
`;


export const photoCircle = css`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #e6f0e8;
  flex: 0 0 140px;

  position: relative;   /* ✅ 유지 */
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const photoPlaceholder = css`
  position: absolute;   /* ✅ 추가: 항상 중앙 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #2d4028;       /* ✅ 더 진한 색 */
  font-weight: 700;
`;

export const photoImage = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const hiddenFileInput = css`
  display: none;
`;

export const genderButtonGroup = css`
  display: flex;
  gap: 10px;

  button {
    flex: 1;
    height: 38px;
    border-radius: 12px;
  }
`;
