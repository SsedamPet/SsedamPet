/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react";
import * as s from "./styles";
import { Plus, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Header from "../../../components/layout/Header/Header";
import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar";

const PostWrite = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [content, setContent] = useState(""); // 입력 내용 저장
    const [image, setImage] = useState(null); // 이미지 미ㅣㄹ보기 URL 저장
    const [selectedPet, setSelectedPet] = useState("");

    // 임시 펫 목데이터
    const petOptions = [
        { id: 1, name: "초코" },
        { id: 2, name: "바닐라" },
        { id: 3, name: "딸기" }
        ];

    // 이미지 업로드 핸들러
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // 임시 미리보기 URL 만들기
            setImage(imageUrl);
            }
        };

    const handleClose = () => {
        if (content.trim().length > 0 || image) { // 이미지도 체크!
            if (window.confirm("작성 중이던 내용이 사라질 수 있습니다. 나가시겠습니까?")) {
                navigate(-1);
            }
        } else {
            navigate(-1);
        }

    };
    // 이미지나 내용이 비어 있으면?
    const handleSubmit = () => {
        if (!image || content.trim().length === 0 || !selectedPet) {
            alert("펫 선택, 이미지, 본문 내용을 모두 확인해주세요.");
            return;
        }
    {/*확인용 임시 데이터*/}
    const newPost = {
        id: 7,
        petName: selectedPet,
        postImage: image,
        description: content,
        postTime: "방금 전",
        userName: "내 계정",
        profileImg: "https://via.placeholder.com/40"
        };

        console.log("새 피드 데이터:", newPost);
        alert("피드가 작성되었습니다.");
        navigate("/community"); // 이후 CommunityMain에서 최상단 렌더링 로직 필요
    };

    return (
        <div css={s.rootContainer}>
            <main css={s.content}>
                <div css={s.closeButton} onClick={handleClose}>
                    <X size={24} strokeWidth={2.5} color="#333" />
                </div>

                <select
                css={s.inputField}
                value={selectedPet}
                onChange={(e) => setSelectedPet(e.target.value)}
                >
                    <option value="" disabled={selectedPet !== ""}>
                        펫 선택하기
                    </option>
                    {petOptions.map(pet => (
                        <option key={pet.id} value={pet.name}>{pet.name}</option>
                    ))}
                </select>

                <div css={s.imageUploadBox} onClick={handleImageClick} style={{ cursor: "pointer" }}>
                    {image ? (
                        <img src={image} alt="미리보기" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                        ) : (
                            <Plus size={40} color="#999" />
                        )}
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                />

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