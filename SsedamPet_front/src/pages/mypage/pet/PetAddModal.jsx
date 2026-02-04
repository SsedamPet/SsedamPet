/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import * as s from "./styles";
import { api } from "../../../configs/axiosConfig";
import { useQueryClient } from "@tanstack/react-query";

const petAddForm = {
    petType: "",
    petName: "",
    petBreed: "",
    petBirth: "",
    petGender: "",
    petWeight: "",
};

const PetAddModal = ({ onClose }) => {
    const [form, setForm] = useState(petAddForm);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [petImageFile, setPetImageFile] = useState(null);
    const [petImagePreview, setPetImagePreview] = useState("");
    
    const queryClient = useQueryClient();

    const setField = (key, value) => setForm((prev) => ({...prev, [key]: value}));

    const isValid = form.petType && form.petName.trim().length > 0;
    
    const buildPayload = () => ({
        petType: form.petType || null,
        petName: form.petName.trim(),
        petBreed: form.petBreed.trim() || null,
        petBirth: form.petBirth || null,
        petGender: form.petGender || null,
        petWeight: form.petWeight ? Number(form.petWeight) : null,
    });

    const handlePickImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPetImageFile(file);
    setPetImagePreview(URL.createObjectURL(file));
    };

    const uploadPetImage = async (petId) => {
    if (!petImageFile) return;

    const formData = new FormData();
    formData.append("file", petImageFile);

    
    await api.post(`/api/mypage/pets/${petId}/pet-profile-image`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    };
    

    const handleSave = async () => {
        if (!isValid) {
            alert("반려동물 종류와 이름은 필수입니다.");
            return;
        }
    

    try {
        setIsSubmitting(true);

        const res = await api.post("/api/mypage/pets", buildPayload());
        const petId = res?.data?.petId || res?.data?.data?.petId;
        
        if (!petId) {
            console.error("petId가 없습니다.", res?.data);
            alert("저장에 실패했습니다. petId가 없습니다.")
            return;
        }
        await uploadPetImage(petId);
        alert("반려동물이 성공적으로 등록되었습니다!");

        queryClient.invalidateQueries({queryKey: ["myPets"]});
        onClose?.();
    } catch (e) {
        console.error(e);
        alert("저장에 실패했습니다.");
    } finally {
        setIsSubmitting(false);
    }
};

    
    return (
        <div css={s.modalOverlay} onClick={onClose}>
            <div css={s.modalContainer} onClick={(e) => e.stopPropagation()}>
                <button css={s.closeButton} onClick={onClose}>✕</button>

                <div css={s.section}>
                    <label>1. 반려동물 종류</label>
                    <div css={s.buttonGroup}>
                        <button type="button" onClick={() => setField("petType", "DOG")} css={form.petType === "DOG" ? s.selectedButton : s.unSelectedButton}>강아지</button>
                        <button type="button" onClick={() => setField("petType", "CAT")} css={form.petType === "CAT" ? s.selectedButton : s.unSelectedButton}>고양이</button>
                    </div>
                </div>

                <div css={s.section}>
                    <label>2. 기본 정보 <span>* 는 필수 입력 항목</span></label>
                    <div css={s.inputRow}>
                        <div className="input-box">
                            <span>반려동물 이름</span>
                            <input type="text" placeholder="이름" value={form.petName} onChange={(e) => setField("petName", e.target.value)}/>
                        </div>
                        <div className="input-box">
                            <span>반려동물 품종</span>
                            <input type="text" placeholder="품종" value={form.petBreed} onChange={(e) => setField("petBreed", e.target.value)}/>
                        </div>
                    </div>
                </div>

                <div css={s.section}>
                    <label>3. 추가정보</label>
                    <div css={s.photoSection}>
                        <label css={s.photoCircle}>
                            {petImagePreview ? (
                                <img
                                    src={petImagePreview}
                                    alt="pet preview"
                                    css={s.photoImage}
                                />
                            ) : (
                                <span css={s.photoPlaceholder}>사진</span>
                            )}

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePickImage}
                            css={s.hiddenFileInput} 
                        />
                        </label>

                        <div css={s.infoInputs}>
                            <div className="input-item">
                                <span>생년월일</span>
                                <input type="date" value={form.petBirth} onChange={(e) => setField("petBirth", e.target.value)} />
                            </div>
                            <div className="input-item">
                                <span>성별</span>
                                <div css={s.genderButtonGroup}>
                                    <button type = "button" css={form.petGender === "M" ? s.selectedButton : s.unSelectedButton} onClick={() => setField("petGender", "M")}>남자</button>
                                    <button type = "button" css={form.petGender === "F" ? s.selectedButton : s.unSelectedButton} onClick={() => setField("petGender", "F")}>여자</button>
                                </div>
                            </div>
                            <div className="input-item">
                                <span>체중</span>
                                <input type="number" step="0.1" placeholder="5 (kg)" value={form.petWeight} onChange={(e) => setField("petWeight", e.target.value)}/>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div css={s.footerButtons}>
                    <button className="delete" onClick={onClose}>삭제</button>
                    <button className="save" onClick={handleSave} disabled={!isValid || isSubmitting} style={{ opacity: !isValid || isSubmitting ? 0.6 : 1 }}>저장</button>
                </div>
            </div>
        </div>
    );
};

export default PetAddModal;