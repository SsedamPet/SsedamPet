/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const rootContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #F8FCF5;
    overflow: hidden;
`;


/* 중앙 댓글 영역 (박스 형태) */
export const mainContent = css`
    flex: 1;
    width: 100%;
    max-width: 600px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const commentBoxContainer = css`
    flex: 1;
    background-color: #F1F9EE; /* 피그마의 아주 연한 녹색 박스 배경 */
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
`;

/* 박스 내부의 '댓글' 타이틀 바 */
export const commentBoxHeader = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 20px;
    position: relative;
    .box-title {
        font-size: 22px;
        font-weight: 700;
        color: #556B2F;
    }
`;

export const closeButton = css`
    position: absolute;
    right: 20px;
    background: none;
    border: 1px solid #ddd;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

/* 댓글 리스트 스크롤 영역 */
export const commentScrollArea = css`
    flex: 1;
    overflow-y: auto;
    padding: 0 20px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    &::-webkit-scrollbar { display: none; }
`;

export const commentWrapper = css`
    background: white;
    border-radius: 15px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.03);
`;

export const commentItem = css`
    display: flex;
    gap: 12px;
`;

export const avatar = css`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #FFD54F;
    flex-shrink: 0;
`;

export const contentBox = css`
    flex: 1;
    .author-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        .name { font-weight: 700; font-size: 14px; }
        .date { font-size: 11px; color: #999; }
    }
    .text { font-size: 14px; color: #333; line-height: 1.4; }
    .reply-toggle {
        margin-top: 8px;
        font-size: 12px;
        color: #888;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        &::before { content: ""; display: inline-block; width: 20px; height: 1px; background: #ddd; }
    }
`;

/* 대댓글 스타일 */
export const replyList = css`
    margin-top: 10px;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const replyItem = css`
    display: flex;
    gap: 10px;
    position: relative;
    &::before {
        content: "ㄴ";
        position: absolute;
        left: -15px;
        color: #ccc;
    }
`;

/* 댓글 입력창 */
export const inputArea = css`
    padding: 15px 20px;
    background: white;
    display: flex;
    gap: 10px;
    align-items: center;
    border-top: 1px solid #f0f0f0;
`;

export const inputField = css`
    flex: 1;
    background: #f8f8f8;
    border: none;
    padding: 10px 15px;
    border-radius: 10px;
    outline: none;
`;

export const submitBtn = css`
    width: 10%;
    height: 90%;
    background-color: #111;
    color: #CCC;
    font-weight: 800;
    cursor: pointer;
    border: none;
    background: none;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
    background-color: #f0f0f0;
`;

export const submitBtnActive = css`
    background-color: #FFD54F !important;
    color: #000 !important;
`;