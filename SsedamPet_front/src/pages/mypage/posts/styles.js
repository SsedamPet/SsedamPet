import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background-color: #EDFCE0;
  min-height: auto; 
  height: auto;
  border-radius: 102px;
  padding: 20px 20px 50px 20px;
  box-sizing: border-box;
  scrollbar-width: none;
`;

export const monthNav = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 14px;
`;

export const postListContainer = css`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  width: 100%;
  max-width: 420px;
  padding: 0;
  box-sizing: border-box;
`;

export const postItem = css`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #E0ECE3;
`;

export const footerDots = css`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
  
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #656565;
  }
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
  align-items: center;
  z-index: 1000;
`;

export const postImg = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;


export const monthArrow = css`
  cursor: pointer;
  font-size: 18px;
  color: #2d4028;
  user-select: none;
`;

export const monthTitle = css`
  font-size: 16px;
  font-weight: 700;
  color: #2d4028;
`;

export const postThumb = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
`;

