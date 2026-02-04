import { css } from "@emotion/react";

export const toastWrap = css`
  position: fixed;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: calc(100% - 32px);
  max-width: 520px;
`;



export const toastBox = css`
  background: rgba(0, 0, 0, 0.82);
  color: #fff;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.3;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.25);
`;
