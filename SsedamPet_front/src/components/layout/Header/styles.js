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
    z-index: 1000;
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