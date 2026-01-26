import { css } from "@emotion/react";

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center; 
    width: 100%;
    min-height: 100vh;
`;

export const topRow = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
`;

export const iconGroup = css`
    position: absolute;
    right: 0;
    display: flex;
    gap: 12px;
    color: white;
`;

export const filterRow = css`
    width: 100%;
    max-width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 20px; 
    box-sizing: border-box;
    background-color: #F8FCF5; 
    margin-top: 10px; 
`;

export const headerTab = css`
    display: flex;
    gap: 5px;
`;

export const tabButton = (isActive) => css`
    padding: 4px 12px;
    border: none;
    background-color: ${isActive ? '#D9D9D9' : '#D9D9D9'};
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
`;

export const writeTextButton = css`
    background-color: #C4C4C4;
    border: none;
    padding: 4px 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
`;

export const content = css`
    width: 100%;
    max-width: 600px;
    padding: 15px;
    background-color: #F8FCF5; 
    flex: 1;
`;

export const postCard = css`
    background-color: #E8F5E9; 
    border-radius: 25px;
    padding: 20px;
    margin-bottom: 15px;
`;

export const userInfo = css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 15px;
`;

export const profileImg = css`
    width: 45px;
    height: 45px;
    background-color: #DDD;
    border-radius: 50%;
`;

export const userDetail = css`
    display: flex;
    flex-direction: column;
    .userName { 
        font-weight: 700; 
        font-size: 15px;
    }
    .postTime { 
        font-size: 13px; 
        color: #333; 
    }
`;

export const postImage = css`
    width: 100%;
    aspect-ratio: 4 / 3;
    background-color: #CCC;
    border-radius: 4px;
    margin-bottom: 15px;
`;

export const postText = css`
    margin-bottom: 15px;
    .description { 
        font-size: 15px; 
        color: #558B2F; 
        font-weight: 600; 
        margin-bottom: 5px; 
    }
    .hashtags { 
        font-size: 14px;
        color: #558B2F; 
    }
`;

export const interactionBar = css`
    display: flex;
    gap: 20px;
`;

export const statItem = css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 700;
`;

export const floatingButton = css`
    position: fixed;
    bottom: 110px;
    right: calc(50% - 280px);
    width: 55px;
    height: 55px;
    background-color: #E0E0E0;
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
`;

