import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;         
    min-height: 100vh;         
    margin: 0 auto;
    background-color: #ffffff; 
`;
export const container = css`
    width: 600px;           
    min-height: 1024px;          
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
`;

export const header = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #EEBD85; 
    color: #ffffff;
    font-size: 32px;
    font-family: 'Inter', sans-serif;
    font-weight: 900;
    letter-spacing: 2px;
    margin-bottom: 30px;
`;

export const content = css`
    padding: 60px 0;
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
    background-color: #FFF9EE; 
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
    background-color: #FFF9EE;
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
    background-color: #EEBD85;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    cursor: pointer;
    flex-shrink: 0;
`;

export const label = css`
    width: 90px;
    height: 24px;
    left: calc(50% - 181px - 110px);
    font-size: 18px;
    position: absolute;
    color: #B6B6B6;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    text-align: right
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

export const profileCircle = css`
    width: 205px;
    height: 205px;
    background-color: #D9D9D9;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    color: #000000;
    font-size: 24px;
    cursor: pointer;
`;

export const submitButton = css`
    width: 385px;
    height: 60px;
    margin: 20px auto 50px;
    padding: 15px;
    background-color: #EEBD85;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 24px;
    cursor: pointer;
`;