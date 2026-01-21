import { css } from "@emotion/react";

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100%;
    min-height: 100vh;
    background-color: #fff;
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
    font-size: 28px;
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
    padding: 60px 20px;
    display: flex;
    flex-direction: column;
    align-items: center; 
    box-sizing: border-box;
    flex: 1;
    margin-bottom: 20px;
`;

export const profileUploadCircle = css`
    width: 180px;
    height: 180px;
    background-color: #D2F4D0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
    
    .upload-text {
        color: #6B6B6B;
        font-size: 18px;
        font-weight: 600;
    }
`;

export const buttonGroup = css`
    display: flex;
    gap: 20px;
    margin-bottom: 80px;
`;

export const selectionButton = css`
    width: 110px;
    height: 45px;
    background-color: #C2F49B;
    border: none;
    border-radius: 15px;
    color: #444;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
`;

export const nextButton = css`
    width: 140px;
    height: 48px;
    background-color: #B7F2C9;
    border: none;
    border-radius: 20px;
    color: #444;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
`;

export const bottomNavBar = css`
    width: 100%;
    max-width: 600px;
    height: 85px;
    background-color: #F8FCF5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.05);

    .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        color: #888;
    }

    .nav-item.active {
        color: #333;
    }

    .nav-label {
        font-size: 12px;
        font-weight: 600;
    }
`;