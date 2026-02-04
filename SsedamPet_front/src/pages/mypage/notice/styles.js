import { css } from "@emotion/react";

export const overlay = css`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  z-index: 9998;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 70px;
`;

export const modal = css`
  width: calc(100% - 32px);
  max-width: 520px;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
`;

export const header = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 14px;
  border-bottom: 1px solid #eee;
`;

export const title = css`
  font-weight: 800;
  font-size: 16px;
`;

export const readAllBtn = css`
  border: none;
  background: #eaf7ea;
  padding: 8px 10px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
`;

export const list = css`
  max-height: 420px;
  overflow: auto;
`;

export const empty = css`
  padding: 18px;
  color: #777;
`;

export const item = (isRead) => css`
  padding: 12px 14px;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
  background: ${isRead === 2 ? "#f6fff6" : "#fff"};
  &:hover {
    background: #f7f7f7;
  }
`;

export const msg = css`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 6px;
`;

export const meta = css`
  font-size: 12px;
  color: #777;
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const unreadDot = css`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff4d4f;
  display: inline-block;
`;

export const closeBtn = css`
  width: 100%;
  padding: 12px 0;
  border: none;
  background: #2d4028;
  color: white;
  font-weight: 800;
  cursor: pointer;
`;
