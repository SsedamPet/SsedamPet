import { css } from "@emotion/react";

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100%;
    min-height: 100vh;
    gap: 0; 
`;

export const container = css`
    width: 100%;
    max-width: 600px;           
    flex: 1;
    display: flex;
    flex-direction: column;
`;

export const content = css`
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`;

export const inputBox = css`
    width: 362px;
    height: 70px;
    padding: 0 20px;
    border: none;
    border-radius: 10px;
    background-color: #E0FFEA; 
    font-size: 14px;
    box-sizing: border-box;
    outline: none;
`;

export const nicknameWrapper = css`
    display: flex;
    align-items: center;
    width: 458px;
    gap: 12px;
    height: 70px;
    transform: translateX(48px);
`;

export const nicknameInput = css`
    width: 362px;
    height: 70px;
    padding: 0 20px;
    border: none;
    border-radius: 10px;
    background-color: #E0FFEA;
    font-size: 14px;
    outline: none;
    flex: 1;
`;

export const fixedInput = css`
    ${inputBox};
    cursor: not-allowed;
`;

export const inputRow = css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 70px;
    position: relative;
`;

export const checkButton = css`
    width: 84px;
    height: 42px;       
    background-color: #C2F49B;
    color: #6B6B6B;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 300;
    cursor: pointer;
`;

export const label = css`
    width: 90px;
    height: 24px;
    left: calc(50% - 181px - 110px);
    font-size: 18px;
    position: absolute;
    color: #6B6B6B;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    text-align: right;
`;

 export const profileRow = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    margin-top: 20px;
    height: 205px;
`;

export const profileCircleArea = css`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const profileCircle = img => css`
    box-sizing: border-box;
    border: 1px solid #B7F2C9;
    width: 205px;
    height: 205px;
    background-image: url("${img}");
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    color: #000000;
    font-size: 22px;
    cursor: pointer;
`;

export const submitButton = css`
    width: 385px;
    height: 60px;
    margin: 20px auto 30px;
    padding: 15px;
    background-color: #B7F2C9;
    color: #6B6B6B;
    border: none;
    border-radius: 10px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;

    &:disabled { 
        background-color: #6B6B6B;
        color: #B7F2C9;
        cursor: default;
    }
`;

