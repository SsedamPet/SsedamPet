/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";

const PetInformation = () => {
    const [petType, setPetType] = useState(""); // dog or cat
    const [petName, setPetName] = useState("");

    return (
        <div css={s.rootContainer}>
            <main css={s.content}>
                <div css={s.infoCard}>
                    <h2 css={s.stepTitle}>1. 반려동물 종류</h2>
                    
                    {/* 강아지/고양이 선택 버튼 그룹 */}
                    <div css={s.buttonGroup}>
                        <button 
                            css={s.typeButton(petType === "dog")} 
                            onClick={() => setPetType("dog")}
                        >
                            강아지
                        </button>
                        <button 
                            css={s.typeButton(petType === "cat")} 
                            onClick={() => setPetType("cat")}
                        >
                            고양이
                        </button>
                    </div>

                    {/* 이름 입력 섹션 */}
                    <div css={s.inputSection}>
                        <input 
                            css={s.nameInput} 
                            placeholder="이름" 
                            value={petName}
                            onChange={(e) => setPetName(e.target.value)}
                        />
                    </div>

                    {/* 다음 단계 버튼 */}
                    <button css={s.nextButton} disabled={!petType || !petName}>
                        다음
                    </button>
                </div>
            </main>
        </div>
    );
};

export default PetInformation;