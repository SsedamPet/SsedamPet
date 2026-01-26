import { css } from "@emotion/react";

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #EDFCE0;
`;

export const content = css`
    height: 911px;
    padding: 20px;
    display: flex;
    justify-content: center;
`;

export const infoCard = css`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const profileImageCircle = css`
    width: 189px;
    height: 189px;
    border-radius: 50%;
    background-color: #D1F6DD;
    margin-bottom: 90px;
`;

export const formList = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 40px;
`;

export const inputRow = css`
    display: flex;
    align-items: center;
    gap: 15px;
`;

export const label = css`
    width: 70px;
    font-size: 20px;
    color: #6B6B6B;
    font-weight: 400px;
`;

const commonInputStyle = css`
    flex: 1;
    padding: 12px 20px;
    border: none;
    border-radius: 15px;
    background-color: #E0ECE3;
    font-size: 20px;
    outline: none;
`;

export const textInput = css`
    ${commonInputStyle}
`;

export const dateWrapper = css`
    ${commonInputStyle}
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    position: relative;
`;

export const hiddenDateInput = css`
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    left: 0;
    cursor: pointer;
`;

export const dateDisplay = (hasValue) => css`
    color: ${hasValue ? "#333" : "#aaa"};
`;

export const calendarIcon = css`
    color: #71a171;
`;

export const genderGroup = css`
    flex: 1;
    display: flex;
    gap: 10px;
`;

export const genderButton = (isSelected) => css`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border: none;
    border-radius: 13px;
    background-color: #E0ECE3;
    cursor: pointer;
    color: #6B6B6B;
    
    .dot {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: ${isSelected ? "#ffbaba" : "#ccc"};
        border: 2px solid white;
    }
`;

export const weightInputWrapper = css`
    ${commonInputStyle}
    display: flex;
    align-items: center;
    
    .unit { 
        color: #6B6B6B; 
    }
`;

export const weightInput = css`
    border: none;
    background: transparent;
    width: 40px;
    outline: none;
`;

export const completeButton = css`
    width: 100%;
    max-width: 190px;
    padding: 12px;
    border: none;
    border-radius: 23px;
    background-color: #B7F2C9;
    color: #000000;
    font-weight: 400px;
    font-size: 22px;
    cursor: pointer;
`;