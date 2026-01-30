/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh; 
    overflow: hidden; 
    background-color: #F8FCF5;
`;

export const content = css`
    width: 100%;
    max-width: 600px;
    padding: 20px;
    flex: 1;
    overflow-y: auto; 
    display: flex;
    flex-direction: column;
    align-items: stretch;
    position: relative;
    box-sizing: border-box;
`;

export const inputField = css`
    width: 100%;
    padding: 12px;
    margin-top: 40px;
    border-radius: 8px;
    font-size: 14px;
    border: none;
    outline: none;
    background-color: #fff;
    appearance: none;
    box-sizing: border-box;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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
    background-color: #EEEEEE;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-top: 20px;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const textAreaField = css`
    ${inputField};
    height: 150px;
    resize: none;
    margin-top: 20px;
    flex-shrink: 0;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    &::placeholder {
        color: #CCCCCC;
    }
`;

export const submitButton = css`
    width: 157px;
    height: 49px;
    background-color: #B7F2C9;
    border: none;
    border-radius: 8px;
    color: #333;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    align-self: center;
    margin: 30px 0 60px 0;
    flex-shrink: 0;
    
    &:active {
        opacity: 0.8;
    }
`;