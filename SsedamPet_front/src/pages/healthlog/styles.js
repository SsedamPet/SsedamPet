import { css } from "@emotion/react";

export const container = css`
  max-width: 600px;
  margin: 0 auto;
  background-color: #f0f9e9;
  min-height: 100vh;
  padding-bottom: 80px;
  font-family: "Pretendard", sans-serif;
`;

export const header = css`
  padding: 20px;
`;

export const topBanner = css`
  background-color: #c2f49b;
  border-radius: 12px;
  font-size: 24px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  gap: 8px;

  .title .highlight {
    color: #3683f5;
  }
`;

export const datePicker = css`
  margin-top: 15px;
  display: flex;
  align-items: center;
`;

export const dateBox = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #c2f49b;
  padding: 8px 16px;
  border-radius: 13px;
  width: fit-content;
  min-width: 220px;
  position: relative;
  cursor: pointer;

  .dateText {
    font-size: 15px;
    font-weight: 400px;
    color: #6b6b6b;
  }

  .calendarIcon {
    font-size: 16px;
  }
`;

export const hiddenDateInput = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

export const mainContent = css`
  padding: 0 20px;
`;

export const sectionCard = css`
  background-color: #c2f49b;
  border-radius: 15px;
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const sectionHeader = css`
  padding: 15px 15px 10px 15px;
`;

export const sectionTitle = css`
  font-size: 14px;
  font-weight: bold;
  margin: 0;
`;

export const sectionSubTitle = css`
  font-size: 12px;
  color: #6b6b6b;
  margin: 4px;
`;

export const whiteInnerBox = css`
  background-color: #ffffff;
  margin: 0;
  padding: 20px 15px;
  flex-grow: 1;
`;

export const buttonGrid = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const optionButton = css`
  background-color: #f1fbe9;
  border: 1px solid #e2d8c5;
  border-radius: 15px;
  padding: 12px 0;
  font-size: 12px;
  color: #555;
  cursor: pointer;
  text-align: center;
`;

export const tagContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`;

export const tagButton = css`
  background-color: #c2f49b;
  border: none;
  border-radius: 13px;
  padding: 6px 12px;
  font-size: 10px;
  cursor: pointer;
`;

export const textInput = css`
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 13px;
  box-sizing: border-box;
  background-color: #edfce0;
`;

export const textArea = css`
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 13px;
  min-height: 80px;
  resize: none;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #edfce0;
`;

export const submitButton = css`
  width: 100%;
  background-color: #c2f49b;
  color: #6b6b6b;
  border: none;
  border-radius: 10px;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  cursor: pointer;
`;
