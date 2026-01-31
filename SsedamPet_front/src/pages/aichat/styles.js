// src/pages/chatbot/styles.js
import { css } from "@emotion/react";

export const container = css`
  max-width: 600px;
  margin: 0 auto;
  background-color: #EDFCE0; 
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
    background-color: #D4EDDA;
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
  justify-content: flex-end; 

  .bubble {
    background-color: #C6F6AD; 
    color: #6B6B6B;
  }
`;

export const botMessage = css`
  ${messageBase};
  justify-content: flex-start; 

  .bubble {
    background-color: #FFFDF9; 
  }

  .avatar {
    margin-right: 10px;
  }
`;

export const inputArea = css`
  background-color: #FFFDF9;
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
    background-color: #F0F0F0;
    padding: 12px 18px;
    font-size: 14px;
    outline: none;
  }

  button {
    background-color: #90EA60;
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
    background-color: #FFFFFF; 
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 13px;
    color: #6B6B6B;
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


