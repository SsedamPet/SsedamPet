/** @jsxImportSource @emotion/react */
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
    position: relative;
`;

export const headerTitle = css`
    color: white;
    font-size: 32px;
    font-weight: 700;
`;

export const bellIcon = css`
    position: absolute;
    right: 20px;           
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    svg {
        fill: white;
        width: 24px;
        height: 24px;
    }
`;

export const profileSection = css`
    width: 600px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 0;
    margin-bottom: 0;
    overflow: hidden;
`;

export const sliderContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const mainSliderArea = css`
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 5;
`;

export const sideCard = css`
    position: absolute;
    width: 380px;
    height: 190px;
    background-color: #EDFCE0;
    border-radius: 40px;
    opacity: 0.5;
    display: flex;
    align-items: center;
    padding: 20px;
    z-index: 1;

    .avatar-mini {
        width: 100px;
        height: 100px;
        background-color: white;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 50px;
    }
`;

export const leftSide = css`
    transform: translateX(-350px);
`;

export const rightSide = css`
    transform: translateX(350px); 
`;

export const dateRowInside = css`
    display: flex;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 15px;

    .today-label { 
        color: #656565; 
        font-size: 20px; 
        font-style: italic; 
    }

    .current-date { 
        color: #656565; 
        font-size: 28px; 
        font-style: italic; 
        font-weight: 600; 
        }
`;

export const petSlider = css`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const arrowBtn = css`
    background: none;
    border: none;
    font-size: 33px;
    color: #B7F2C9;
    cursor: pointer;
`;

export const petInfoBox = css`
    width: 473px;
    height: 233px;
    background-color: #EDFCE0;
    border-radius: 45px;
    padding: 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

export const contentRow = css`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const avatarCircle = css`
    width: 120px;
    height: 120px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 70px;
`;

export const textInfo = css`
    .name-row { 
        font-size: 32px; 
        font-weight: bold; 
        color: #656565;

        span { 
            font-size: 
            24px; 
        }
    }
    .breed-row { 
        font-size: 24px; 
        color: #656565; 
        margin-top: 5px; 
        }
`;

export const healthRecordSection = css`
    width: 100%;
    max-width: 600px;
    padding: 20px;
    box-sizing: border-box;
`;

export const healthRecordBox = css`
    width: 100%;
    background-color: #EDFCE0;
    border-radius: 40px;
    padding: 30px;
    box-sizing: border-box;
`;

export const recordHeader = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;

    .title-group {
        display: flex;
        align-items: center;
        gap: 10px;

        h2 { 
            font-size: 24px; 
            font-weight: 700; 
            color: #000000; 
            margin: 0; 
        }

        .icon { 
            font-size: 
            24px; 
        }
    }
`;

export const editBtn = css`
    background-color: #C2F49B;
    border: none;
    border-radius: 20px;
    padding: 5px 15px;
    font-size: 16px;
    color: #000000;
    cursor: pointer;
`;

export const gridContainer = css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
`;

export const gridItem = css`
    width: 200px;
    height: 110px;
    background-color: #C2F49B;
    border-radius: 20px;
    display: flex;
    align-items: center; 
    justify-content: flex-start; 
    padding-left: 25px;        
    box-sizing: border-box;

    .icon-label-wrapper {
        display: flex;
        flex-direction: column; 
        align-items: center;    
        gap: 6px;              
        width: 70px;          
    }

    .icon-circle {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        background-color: white;
    }

    .label {
        font-size: 18px;
        font-weight: 800;
        color: #000000;
        text-align: center;    
        white-space: nowrap;  
    }
`;

export const weeklyStatContainer = css`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
    padding: 0 20px;
`;

export const weeklyCard = css`
    width: 260px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .card-content {
        padding: 25px 20px;
        text-align: center;
    }

    .title {
        font-size: 13px;
        color: #6B7897;
        font-weight: 600;
        margin-bottom: 12px;
    }

    .stat-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 10px;
    }

    .main-num {
        font-size: 48px;
        font-weight: 900;
        color: #8C96AB;
    }

    .compare-group {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 24px;
        font-weight: 800;
    }

    .up { color: #38E438; }    
    .down { color: #FF0004; } 
    .same { color: #888; }     

    .status-msg {
        font-size: 16px;
        font-weight: 700;
        color: #4A5568;
        margin-top: 5px;
    }

    .tip-box {
        background-color: #CFF5D0;
        padding: 15px;
        font-size: 13px;
        color: #3E6D3F;
        line-height: 1.5;
        font-weight: 600;
        border-top: 1px solid #f0f0f0;
        text-align: left
    }
`;

export const popularSection = css`
    width: 560px;
    background-color: #EDFCE0;
    border-radius: 35px;
    padding: 20px 25px;
    margin-top: 25px;
    box-sizing: border-box;

    .section-header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 15px;
        font-size: 20px;
        font-weight: 700;
        color: #656565;
    }
`;

export const postListWrapper = css`
    background-color: white;
    border-radius: 26px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 12px;
    overflow-x: auto;

    .post-item {
        min-width: 104px;
        height: 104px;
        background-color: #CFF5D0; 
    }

   &::-webkit-scrollbar {
        display: none;
    }

    .more-btn {
        font-size: 28px;
        font-weight: 300;
        cursor: pointer;
        padding-left: 10px;
    }
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

        &:hover {
            opacity: 0.7;
        }
    }

    .nav-icon {
        font-size: 28px; 
        display: flex;
        align-items: center;
        justify-content: center;
        
        svg {
            stroke-width: 1.5;
        }
    }

    .nav-label {
        font-size: 13px;
        font-weight: 600;
        letter-spacing: -0.5px;
    }

    .nav-item.active {
        color: #000000;
        .nav-label {
            font-weight: 800;
        }
    }
`;