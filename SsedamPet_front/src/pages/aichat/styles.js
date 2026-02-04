// src/pages/chatbot/styles.js
import { css } from "@emotion/react";

export const container = css`
  max-width: 600px;
  margin: 0 auto;
  background-color: #edfce0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const chatArea = css`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const messageBase = css`
  display: flex;
  align-items: flex-end;

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #d4edda;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    flex-shrink: 0;
  }

  .bubble {
    padding: 12px 18px;
    border-radius: 20px;
    max-width: 70%;
    font-size: 0.9em;
    line-height: 1.4;
    position: relative;
  }
`;

export const userMessage = css`
  ${messageBase};
  flex-direction: row;
  justify-content: flex-end;
  align-self: flex-end;
  width: fit-content;
  max-width: 90%;

  .message-content {
    order: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .avatar {
    order: 2;
    margin-left: 8px;
  }

  .bubble {
    background-color: #c6f6ad;
    color: #6b6b6b;
    padding: 10px 15px;

    max-width: fit-content;
    white-space: pre-wrap;
    word-break: break-word;
    display: inline-block;
  }
`;

export const bubbleButtons = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  padding-left: 12px;

  .quick-btn {
    background-color: #ffffff;
    border: 1.5px solid #ffbebe;
    border-radius: 18px;
    padding: 6px 14px;
    font-size: 13px;
    color: #ff7676;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover {
      background-color: #fff5f5;
      border-color: #ff7676;
      transform: translateY(-2px);
    }

    &:active {
      transform: scale(0.95);
    }
  }
`;

export const botMessage = css`
  ${messageBase};
  justify-content: flex-start;

  .bubble {
    background-color: #fffdf9;
  }

  .avatar {
    margin-right: 10px;
  }
`;

export const inputArea = css`
  background-color: #fffdf9;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: sticky;
  bottom: 0;
  z-index: 10;

  input {
    flex-grow: 1;
    border: none;
    border-radius: 25px;
    background-color: #f0f0f0;
    padding: 12px 18px;
    font-size: 14px;
    outline: none;
  }

  button {
    background-color: #90ea60;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5em;
    cursor: pointer;
    flex-shrink: 0;
  }
`;

export const topButtonGroup = css`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  .topBtn {
    background-color: #ffffff;
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 13px;
    color: #6b6b6b;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const fixedBtn = css`
  position: fixed;
  bottom: 100px;
  right: calc(50% - 300px + 20px);
  z-index: 9999;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    right: 20px;
  }

  img {
    width: 65px;
    height: 65px;
    object-fit: contain;
  }

  .badge {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #ff4d4d;
    color: white;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
    border: 2px solid white;
  }
`;
