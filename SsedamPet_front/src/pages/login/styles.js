import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;         
    min-height: 100vh;         
    margin: 0 auto;
    background-color: #ffffff; 
`;
export const container = css`
    width: 600px;           
    min-height: 1024px;          
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
`;

export const header = css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: #EEBD85; 
    color: #ffffff;
    font-size: 32px;
    font-family: 'Inter', sans-serif;
    font-weight: 900;
    letter-spacing: 2px;
    margin-bottom: 30px;
`;

export const logoArea = css`
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

export const socialSection = css`
    width: 100%;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const socialText = css`
    width: 80%;
    display: flex;
    align-items: center;
    color: #85898B;
    font-size: 15px;
    margin-bottom: 40px;

    &::before, &::after {
        content: "";
        flex: 1;
        height: 1px;
        background-color: #85898B;
        margin: 0 10px;
    }
`;

export const socialButtons = css`
    display: flex;
    gap: 30px;
`;

export const iconCircle = css`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid #E0E0E0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;