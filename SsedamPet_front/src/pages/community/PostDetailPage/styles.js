/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fafafa;
`;

export const header = css`
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: white;
    border-bottom: 1px solid #dbdbdb;
    position: sticky;
    top: 0;
    z-index: 100;

    button {
        background: none;
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        color: #262626;
    }
`;

export const content = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    overflow-y: auto;
`;

export const postCard = css`
    width: 100%;
    max-width: 600px;
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    margin-bottom: 20px;
    overflow: hidden;
`;

export const commentWrapper = css`
    width: 100%;
    max-width: 600px;
    background-color: white;
    border: 1px solid #dbdbdb;
    border-radius: 8px;
    padding: 10px;
`;