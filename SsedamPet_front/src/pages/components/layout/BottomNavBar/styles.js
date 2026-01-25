import { css } from "@emotion/react";

export const bottomNavBar = css`
  height: 70px;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%); 
  width: 100%;
  max-width: 600px;
  background-color: #FFFFFF;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #EFEFEF;
  box-sizing: border-box; 
  z-index: 9999;
`;

export const navItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ccc;  
  font-size: 11px;
  cursor: pointer;
  flex: 1;
`;