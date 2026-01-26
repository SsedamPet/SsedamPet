/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";
import { Plus, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Header from "../../../components/layout/Header/Header";
import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar";

const PostWrite = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState(""); // 입력 내용 저장
    const [image, setImage] = useState(null);

    const handleClose = () => {
        if (content.trim().length > 0) {
            if (window.confirm("작성 중이던 내용이 사라질 수 있습니다. 나가시겠습니까?")) {
                navigate(-1);
            }
        } else {
            navigate(-1);
        }

    };
    // 이미지나 내용이 비어 있으면?
    const handleSubmit = () => {
        if (content.trim().length === 0) {
            alert("본문 이미지 혹은 내용이 존재하지 않습니다.");
            return;
        }
        alert("피드가 작성되었습니다.");
        navigate("/community");
    };

    return (
        <div css={s.rootContainer}>
            <main css={s.content}>
                <div css={s.closeButton} onClick={handleClose}>
                    <X size={24} strokeWidth={2.5} color="#333" />
                </div>

                <select css={s.inputField}>
                    <option value="">펫 선택하기</option>
                </select>

                <div css={s.imageUploadBox}>
                    <Plus size={40} color="#999" />
                </div>

                <textarea 
                    css={s.textAreaField} 
                    placeholder="피드 내용을 적어주세요!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <button css={s.submitButton} onClick={handleSubmit}>작성 완료</button>
            </main>
            <BottomNavBar />
        </div>
    );
};

export default PostWrite;