/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const rootContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;


export const bellIcon = css`
  position: absolute;
  right: 20px;
  cursor: pointer;
`;

export const content = css`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const inputField = css`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  border: none;
  outline: none;
  background-color: #fff;
  appearance: none;
  box-sizing: border-box;
`;

export const closeButton = css`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  z-index: 5;
  background: none;
  border: none;
  padding: 0;
`;

export const imageUploadBox = css`
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: #d9d9d9;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 20px;
  flex-shrink: 0;
`;

export const textAreaField = css`
  ${inputField};
  height: 150px;
  resize: none;
  margin-top: 20px;
  flex-shrink: 0;
`;

export const submitButton = css`
  width: 157px;
  height: 49px;
  background-color: #b7f2c9;
  border: none;
  border-radius: 8px;
  color: #333;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
  align-self: center;
  margin: 40px 0;
  flex-shrink: 0;
`;
