import { css } from "@emotion/react";

export const navContainer = css`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  height: 70px;
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #eee;
  z-index: 1000;
  box-sizing: border-box;
`;

export const navItem  = (isActive)=> css`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  gap: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-3px);
    & svg {
      color: #333 !important;
    }
    & span {
      color: #333 !important;
      font-weight: 900;
    }
  }

  ${isActive &&
  `
    transform: scale(1.1);
  `}
`;

export const navText = (isActive) => css`
  font-size: 15px;
  color: ${isActive ? "#333" : "#AAA"};
  font-weight: ${isActive ? "900" : "500"};
  transition: font-weight 0.2s ease;
  white-space: nowrap;
`;
