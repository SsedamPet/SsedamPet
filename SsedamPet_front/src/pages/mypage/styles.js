import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f9fdf9;
  min-height: 100vh;
  padding-bottom: 100px;
`;


export const profileSection = css`
  background-color: #d9f2d9;
  border-radius: 35px;
  padding: 25px;
  position: relative;
`;

export const topActionIcons = css`
  position: absolute;
  top: 22px;
  right: 25px;
  display: flex;
  gap: 15px;
  align-items: center;
  svg { cursor: pointer; color: #444; }
`;

export const userMainInfo = css`
  display: flex;
  align-items: center;
  gap: 15px;

  .profile-placeholder {
    width: 70px;
    height: 70px;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 35px;
    position: relative;
  }

  .user-text {
    .name { font-weight: bold; font-size: 18px; color: #2D4028; }
    .email { font-size: 13px; color: #5A7D52; }
  }
`;

/* 공통 주황색 새로고침 배지 스타일 */
export const orangeBadge = css`
  position: absolute;
  bottom: -4px;
  right: -4px;
  background: white;
  border: 1.5px solid #FF8C00; /* 피그마 주황색 테두리 */
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
  svg {
    color: #FF8C00; /* 주황색 화살표 */
  }
`;

export const statsContainer = css`
  display: flex;
  gap: 15px;
  margin-top: 25px;
`;

export const statBox = css`
  flex: 1;
  background-color: #b2ebaf;
  border-radius: 25px;
  padding: 15px;
  text-align: center;
  .count { display: block; font-size: 26px; font-weight: 800; color: #2D4028; }
  .label { font-size: 13px; color: #2D4028; font-weight: 600; opacity: 0.7; }
`;

export const petListContainer = css`
  background-color: #d9f2d9;
  border-radius: 35px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 10px;
`;

export const petCard = css`
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 25px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .pet-info {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .pet-circle {
    width: 55px;
    height: 55px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    position: relative;
  }

  .p-name { font-weight: bold; font-size: 16px; color: #333; }
  .p-desc { font-size: 12px; color: #777; }

  .edit-btn {
    background: #fff; border: 1px solid #eee; padding: 6px 16px;
    border-radius: 12px; font-size: 12px; font-weight: 800; color: #666;
  }
`;