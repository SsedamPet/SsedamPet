import { css } from "@emotion/react";

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #EDFCE0; 
`;

export const content = css`
    width: 564px;
    height: 650px;
    padding: 40px 20px;
    display: flex;
    justify-content: center;
`;

export const infoCard = css`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
`;

export const stepTitle = css`
    align-self: flex-start;
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    margin-top: -30px;   
    margin-left: -70px;   
    margin-bottom: 80px;
`;

export const buttonGroup = css`
    width: 186px;
    height: 36px;
    display: flex;
    justify-content: center;
    gap: 15px;
    width: 100%;
    margin-bottom: 40px;
`;

// 선택 상태에 따라 색상이 변하는 함수형 스타일
export const typeButton = (isSelected) => css`
    flex: 1;
    padding: 12px;
    border-radius: 13px;
    border: none;
    background-color: #C2F49B; 
    color: #6B6B6B;
    font-weight: 400;
    cursor: pointer;
`;

export const inputSection = css`
    width: 100%;
    display: flex;
    justify-content: center; 
    margin-bottom: 120px;
`;

export const nameInput = css`
    width: 175px;
    height: 36px;
    padding: 0 12px; 
    line-height: 36px; 
    border: none;
    border-radius: 13px;
    background-color: #C2F49B;
    text-align: center; 
    outline: none;
`;

export const nextButton = css`
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 20px;
    background-color: #90E9AB;
    color: #6B6B6B;
    font-weight: 400px;
    font-size: 16px;
    cursor: pointer;
    margin-top: auto;
`;