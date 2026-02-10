import { css } from "@emotion/react";

export const frame = css`
    box-sizing: border-box;
    margin: 0 auto;
    width: 600px;
    height: 100vh;
    padding-bottom: 70px;
    background-color: #ffffff;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;
