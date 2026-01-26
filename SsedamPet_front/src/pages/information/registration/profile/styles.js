import { css } from "@emotion/react";

export const rootContainer = css`
    width: 600px;
    height: 911px;
    display: flex;
    flex-direction: column;
    background-color: #EDFCE0; 
`;

export const content = css`
    flex: 1;
    display: flex;
    justify-content: center;
    padding-top: 60px; 
`;

export const infoCard = css`
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px;
`;

/* 피그마의 원형 이미지 업로드 영역 스타일 */
export const profileUploadCircle = css`
    width: 205px;
    height: 205px;
    border-radius: 50%;
    background-color: #D1F6DD;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    cursor: pointer;

    .upload-text {
        color: #000000;
        font-weight: 400px;
    }
`;

export const buttonGroup = css`
    display: flex;
    gap: 15px;
    width: 100%;
    margin-bottom: 100px;
`;

export const selectionButton = css`
    flex: 1;
    width: 190px;
    height: 55px;
    padding: 12px;
    border: none;
    border-radius: 13px; 
    background-color: #C2F49B;
    color: #000000;
    font-weight: 400px;
    cursor: pointer;
`;

export const nextButton = css`
    width: 100%;
    max-width: 190px;
    height: 55px;
    padding: 15px;
    border: none;
    border-radius: 13px;
    background-color: #B7F2C9;
    color: #000000;
    font-weight: 400px;
    cursor: pointer;
`;