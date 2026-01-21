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
    width: 564px;
    height: 627px;
    flex: 1;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
`;

export const infoCard = css`
    width: 100%;
    max-width: 500px;
    background-color: #EDFCE0; 
    border-radius: 30px;
    padding: 30px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px; 
`;

export const stepTitle = css`
    align-self: flex-start;
    margin: 0 0 10px 0;
    font-size: 14px;
    color: #000000;
`;

export const buttonGroup = css`
    display: flex;
    gap: 15px;
    width: 100%;
    justify-content: center;
`;

export const typeButton = (isActive) => css`
    width: 120px;
    height: 36px;
    border-radius: 13px;
    border: none;
    background-color: ${isActive ? "#C2F49B" : "#C2F49B"};
    color: #6B6B6B;
    font-size: 18px;
    cursor: pointer;
`;

export const inputSection = css`
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const nameInput = css`
    width: 175px;
    height: 40px;
    background-color: #C2F49B;
    border: none;
    border-radius: 13px;
    text-align: center;
    font-size: 16px;
    color: #6B6B6B;
    outline: none;
`;

export const nextButton = css`
    width: 175px;
    height: 36px;
    background-color: #90E9AB;
    border: none;
    border-radius: 13px;
    color: #6B6B6B;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    margin-top: 40px;
`;

export const bottomNavBar = css`
    position: relative; 
    width: 100%;
    max-width: 600px; 
    height: 90px; 
    background-color: #F8FCF5; 
    display: flex;
    justify-content: space-around;
    align-items: center;
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
    }

    .nav-item.active {
        color: #000000;
        .nav-label { font-weight: 800; }
    }
`;