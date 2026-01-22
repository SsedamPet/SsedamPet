import { css } from "@emotion/react";

export const bottomNavBar = css`
    width: 100%;
    max-width: 600px;
    background: white;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    border-top: 1px solid #eee;
    border-radius: 25px 25px 0 0;
    position: fixed;
    bottom: 0;
`;

export const navItem = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ccc;
    font-size: 10px;
    gap: 4px;
`;