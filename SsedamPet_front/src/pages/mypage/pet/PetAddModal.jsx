/** @jsxImportSource @emotion/react */
import React from "react";
import * as s from "./styles";
import { useNavigate } from "react-router-dom";

const PetAddModal = ({ onClose }) => {
    const navigate = useNavigate();
    return (
        <div css={s.modalOverlay} onClick={onClose}>
            <div css={s.modalContainer} onClick={(e) => e.stopPropagation()}>
                <button css={s.closeButton} onClick={onClose}>✕</button>

                <div css={s.section}>
                    <label>1. 반려동물 종류</label>
                    <div css={s.buttonGroup}>
                        <button >강아지</button>
                        <button>고양이</button>
                    </div>
                </div>

                <div css={s.section}>
                    <label>2. 기본 정보 <span>* 는 필수 입력 항목</span></label>
                    <div css={s.inputRow}>
                        <div className="input-box">
                            <span>반려동물 이름</span>
                            <input type="text" placeholder="이름" />
                        </div>
                        <div className="input-box">
                            <span>반려동물 품종</span>
                            <input type="text" placeholder="품종" />
                        </div>
                    </div>
                </div>

                <div css={s.section}>
                    <label>3. 추가 정보</label>
                    <div css={s.photoSection}>
                        <div css={s.photoCircle} />
                        <div css={s.infoInputs}>
                            <div className="input-item">
                                <span>생년월일</span>
                                <input type="text" placeholder="2026/01/01" />
                            </div>
                            <div className="input-item">
                                <span>성별</span>
                                <div css={s.buttonGroup}>
                                    <button style={{padding: '6px'}}>남아</button>
                                    <button style={{padding: '6px'}}>여아</button>
                                </div>
                            </div>
                            <div className="input-item">
                                <span>체중</span>
                                <input type="text" placeholder="5 (kg)" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div css={s.footerButtons}>
                    <button className="delete" onClick={onClose}>삭제</button>
                    <button className="save">저장</button>
                </div>
            </div>
        </div>
    );
};

export default PetAddModal;