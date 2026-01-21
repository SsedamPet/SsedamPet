import { css } from "@emotion/react";

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100%;
    min-height: 100vh;
    gap: 0; 
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
`;

export const infoCard = css`
    width: 100%;
    background-color: #EDFCE0;
    border-radius: 30px;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const profileImageCircle = css`
    width: 180px;
    height: 180px;
    background-color: #D2F4D0;
    border-radius: 50%;
    margin-bottom: 40px;
`;

export const formList = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
`;

export const inputRow = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
`;

export const label = css`
    width: 70px;
    font-size: 16px;
    color: #6B6B6B;
    text-align: right;
`;

export const textInput = css`
    width: 250px;
    height: 45px;
    background-color: #F8FCF5; /* 피그마의 흰색 계열 입력창 */
    border: none;
    border-radius: 12px;
    padding: 0 15px;
    color: #6B6B6B;
    font-size: 16px;
    outline: none;
`;

export const dateWrapper = css`
    position: relative;
    width: 250px;
    height: 45px;
    background-color: #D2F4B0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
`;

export const hiddenDateInput = css`
    position: absolute;
    opacity: 0;
    width: 1px;
    height: 1px;
`;

export const dateDisplay = css`
    flex: 1;
    color: #6B6B6B;
    font-size: 16px;
`;

export const calendarIcon = css`
    color: #444;
    cursor: pointer;
`;

export const genderGroup = css`
    display: flex;
    gap: 10px;
    width: 250px;
`;

export const genderButton = (isActive) => css`
    flex: 1;
    height: 45px;
    background-color: #D2F4B0;
    border: none;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #6B6B6B;
    font-size: 14px;
    cursor: pointer;

    .dot {
        width: 12px;
        height: 12px;
        background-color: ${isActive ? "#A6A6A6" : "#E2E2E2"};
        border-radius: 50%;
    }
`;

export const completeButton = css`
    width: 200px;
    height: 50px;
    background-color: #B7F2C9;
    border: none;
    border-radius: 15px;
    color: #444;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
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
        transition: all 0.2s ease;

        &:hover { opacity: 0.7; }
    }

    .nav-icon {
        font-size: 28px; 
        display: flex;
        align-items: center;
        justify-content: center;
        svg { stroke-width: 1.5; }
    }

    .nav-label {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: -0.5px;
    }

    .nav-item.active {
        color: #000000;
        .nav-label { font-weight: 800; }
    }
`;