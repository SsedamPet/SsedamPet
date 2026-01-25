/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react";
import * as s from "./styles";
import { Calendar } from 'lucide-react'; 

const PetDetails = () => {
    const [petInfo, setPetInfo] = useState({
        name: "",
        birthDate: "",
        gender: "male", 
        breed: "",
        weight: ""
    });
    
    const dateInputRef = useRef(null);
    
    const handleCalendarClick = () => {
        if (dateInputRef.current) {
            dateInputRef.current.showPicker();
        }
    };

    const handleInputChange = (field, value) => {
        setPetInfo(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div css={s.rootContainer}>
            <main css={s.content}>
                <div css={s.infoCard}>
                    <div css={s.profileImageCircle}></div>
                    
                    <div css={s.formList}>
                        <div css={s.inputRow}>
                            <label css={s.label}>이름</label>
                            <input 
                                css={s.textInput} 
                                placeholder="냥이"
                                value={petInfo.name} 
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                        </div>

                        <div css={s.inputRow}>
                            <label css={s.label}>생년월일</label>
                            <div css={s.dateWrapper} onClick={handleCalendarClick}>
                                <input 
                                    type="date"
                                    ref={dateInputRef}
                                    css={s.hiddenDateInput}
                                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                                />
                                <div css={s.dateDisplay(!!petInfo.birthDate)}>
                                    {petInfo.birthDate ? petInfo.birthDate.replace(/-/g, '/') : "2026/01/01"}
                                </div>
                                <Calendar css={s.calendarIcon} size={20} />
                            </div>
                        </div>

                        <div css={s.inputRow}>
                            <label css={s.label}>성별</label>
                            <div css={s.genderGroup}>
                                <button 
                                    type="button"
                                    css={s.genderButton(petInfo.gender === 'male')}
                                    onClick={() => handleInputChange('gender', 'male')}
                                >
                                    <div className="dot" /> 남아
                                </button>
                                <button 
                                    type="button"
                                    css={s.genderButton(petInfo.gender === 'female')}
                                    onClick={() => handleInputChange('gender', 'female')}
                                >
                                    <div className="dot" /> 여아
                                </button>
                            </div>
                        </div>

                        <div css={s.inputRow}>
                            <label css={s.label}>품종</label>
                            <input 
                                css={s.textInput} 
                                placeholder="샴"
                                value={petInfo.breed} 
                                onChange={(e) => handleInputChange('breed', e.target.value)}
                            />
                        </div>

                        <div css={s.inputRow}>
                            <label css={s.label}>체중</label>
                            <div css={s.weightInputWrapper}>
                                <input 
                                    css={s.weightInput} 
                                    placeholder="5"
                                    value={petInfo.weight} 
                                    onChange={(e) => handleInputChange('weight', e.target.value)}
                                />
                                <span className="unit">(kg)</span>
                            </div>
                        </div>
                    </div>
                    <button css={s.completeButton}>완료</button>
                </div>
            </main>
        </div>
    );
};

export default PetDetails;