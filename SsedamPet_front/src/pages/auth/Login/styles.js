import { css } from "@emotion/react";

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    background-color: #ffffff;
`;

export const loginContent = css`
    width: 100%;
    max-width: 600px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
`;

export const logoArea = css`
    margin-top: 80px;
    display: flex;
    justify-content: center;

    img {
        width: 400px;
        height: 300px;
    }
`;

export const socialSection = css`
    width: 100%;
    margin: 30px 0 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const socialText = css`
    width: 100%;
    display: flex;
    align-items: center;
    color: #85898b;
    font-size: 15px;
    margin-bottom: 40px;

    &::before,
    &::after {
        content: "";
        flex: 1;
        height: 1px;
        background-color: #e0e0e0;
        margin: 0 15px;
    }
`;

export const socialButtons = css`
    display: flex;
    gap: 30px;
`;

export const iconCircle = css`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.2s ease;
    &:hover {
        transform: scale(1.05);
    }
`;
