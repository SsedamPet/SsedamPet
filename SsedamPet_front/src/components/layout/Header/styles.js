/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const headerBar = css`
    width: 100%;
    max-width: 600px;
    height: 60px;
    background-color: #B7F2C9;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
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

export const noticeBellInCard = css`
  position: absolute;
  right: 20px;          /* ✅ 오른쪽 끝 */
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const noticeBadge = css`
  position: absolute;
  top: -4px;
  right: -6px;
  background: #ff3b30;
  color: white;
  border-radius: 999px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
`;
