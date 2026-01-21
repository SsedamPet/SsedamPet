import { css } from "@emotion/react";

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100%;
    min-height: 100vh;
`;

export const headerBar = css`
    width: 100%;
    max-width: 600px;
    height: 60px;
    background-color: #B7F2C9; 
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 32px;
    font-weight: 700;
`;

export const content = css`
    width: 100%;
    max-width: 600px;
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`;

export const infoCard = css`
    width: 100%;
    background-color: #EDFCE0;
    border-radius: 40px;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`;

export const profileImageCircle = css`
    width: 160px;
    height: 160px;
    background-color: #D2F4D0;
    border-radius: 50%;
    margin-bottom: 35px;
`;

export const formList = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 30px;
`;

export const inputRow = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    width: 100%;
`;

export const label = css`
    width: 80px;
    font-size: 16px;
    color: #6B6B6B;
    text-align: right;
    font-weight: 500;
`;

const commonInputStyle = `
    width: 240px;
    height: 45px;
    background-color: #F8FCF5;
    border: none;
    border-radius: 15px;
    padding: 0 15px;
    color: #6B6B6B;
    font-size: 15px;
    outline: none;
    box-sizing: border-box;
    display: flex;
    align-items: center;
`;

export const textInput = css`
    ${commonInputStyle}
    &::placeholder {
        color: #C2C2C2;
    }
`;

export const dateWrapper = css`
    ${commonInputStyle}
    cursor: pointer;
    justify-content: space-between;
`;

export const weightInputWrapper = css`
    ${commonInputStyle}
    justify-content: space-between;
    .unit {
        color: #A0A0A0;
        font-size: 14px;
    }
`;

export const weightInput = css`
    border: none;
    background: transparent;
    width: 80%;
    outline: none;
    color: #6B6B6B;
    font-size: 15px;
    &::placeholder {
        color: #C2C2C2;
    }
`;

export const hiddenDateInput = css`
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
`;

export const dateDisplay = (hasValue) => css`
    color: ${hasValue ? "#6B6B6B" : "#C2C2C2"};
    font-size: 15px;
`;

export const calendarIcon = css`
    color: #6B6B6B;
`;

export const genderGroup = css`
    display: flex;
    gap: 10px;
    width: 240px;
`;

export const genderButton = (isActive) => css`
    flex: 1;
    height: 45px;
    background-color: #F8FCF5;
    border: none;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #6B6B6B;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;

    .dot {
        width: 12px;
        height: 12px;
        background-color: ${isActive ? "#C2F49B" : "#E8E8E8"};
        border-radius: 50%;
        border: 1px solid ${isActive ? "#A8E087" : "#D1D1D1"};
    }

    &:hover { background-color: #f0f7ed; }
`;

export const completeButton = css`
    width: 180px;
    height: 50px;
    background-color: #B7F2C9;
    border: none;
    border-radius: 20px;
    color: #444;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    &:hover { background-color: #A5E8B9; }
`;

export const bottomNavBar = css`
    position: relative; 
    margin-top: 50px; 
    width: 100%;
    max-width: 600px; 
    height: 90px; 
    background-color: #F8FCF5; 
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.03);
    padding: 0 10px 10px 10px;
    box-sizing: border-box;

    .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        color: #444444;
        cursor: pointer;
        flex: 1;
    }

    .nav-icon {
        font-size: 28px; 
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav-label {
        font-size: 13px;
        font-weight: 600;
    }

    .nav-item.active {
        color: #000000;
        .nav-label { font-weight: 800; }
    }
`;