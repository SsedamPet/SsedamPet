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
    position: sticky;
    top: 60px;
    z-index: 9;
`;

export const headerTab = css`
    display: flex;
    gap: 5px;
`;

export const tabButton = (isActive) => css`
    padding: 4px 12px;
    border: none;
    background-color: ${isActive ? '#C0C0C0' : '#D9D9D9'};
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;

    &:active {
        background-color: #d1d1d1;
        transform: scale(0.95);
    }
`;

export const writeTextButton = css`
    background-color: #D9D9D9;
    border: none;
    padding: 4px 10px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;

    &:active {
            background-color: #C0C0C0;
            transform: scale(0.95);
    }
`;

export const content = css`
    width: 100%;
    max-width: 600px;
    padding: 15px 20px;
    background-color: #F8FCF5;
    flex: 1;
    box-sizing: border-box;
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
    position: relative;
    z-index: 100;
`;

export const statItem = css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    position: relative;
    padding: 5px;
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
    cursor: pointer;
    justify-content: center;
    align-items: center;
`;

export const modalOverlay = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 9999;
`;

export const modalContent = css`
    width: 100%;
    max-width: 600px;
    height: 90%; /* 화면의 80% 높이 */
    background-color: white;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    flex-direction: column;
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
    }
`;

export const modalHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    font-weight: bold;
    position: relative;

    span {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: 16px;
        }

    svg, button {
        margin-left: auto;
        cursor: pointer;
        transition: opacity 0.2s;

        &:hover {
           opacity: 0.6;
           }
        }
`;

export const modalBody = css`
    flex: 1;
    overflow-y: auto;
`;

