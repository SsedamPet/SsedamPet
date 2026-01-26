import { css } from "@emotion/react";

export const navContainer = css`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
  z-index: 1000;
`;

export const navItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 4px;
`;

export const navText = (isActive) => css`
  font-size: 12px;
  color: ${isActive ? "#333" : "#AAA"};
  font-weight: ${isActive ? "600" : "400"};
`;