/** @jsxImportSource @emotion/react */
import { useState, useRef } from "react";
import * as s from "./styles";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar";
import { useMeQuery } from "../../../react-query/queries/usersQueries";
import { api } from "../../../configs/axiosConfig";

const PostWrite = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const meQuery = useMeQuery();

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null); // 실제 서버로 보낼 파일
  const [previewUrl, setPreviewUrl] = useState(null); // 화면에 보여줄 미리보기 URL
  const [selectedPet, setSelectedPet] = useState("");

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // 파일 객체 저장
      setPreviewUrl(URL.createObjectURL(file)); // 미리보기 저장
    }
  };

  const handleClose = () => {
    if (content.trim().length > 0 || previewUrl) {
      if (
        window.confirm("작성 중이던 내용이 사라질 수 있습니다. 나가시겠습니까?")
      ) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const handleSubmit = async () => {
    console.log(meQuery.data);
    const userId = meQuery.data?.data?.userId;
    if (!previewUrl || content.trim().length === 0) {
      alert("이미지, 본문 내용을 모두 확인해주세요.");
      return;
    }

    const token = localStorage.getItem("AccessToken");
    const formData = new FormData();
    formData.append("content", content);
    formData.append("image", imageFile);
    formData.append("userId", userId);

    try {
      await api.post("/api/community/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("피드가 작성되었습니다.");
      navigate("/community");
    } catch (error) {
      console.error("등록 실패:", error);
      alert("피드 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div css={s.rootContainer}>
      <main css={s.content}>
        {/* 상단 닫기 버튼 */}
        <div css={s.closeButton} onClick={handleClose}>
          <X size={24} strokeWidth={2.5} color="#333" />
        </div>

        {/* 이미지 업로드 박스 */}
        <div css={s.imageUploadBox} onClick={handleImageClick}>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="미리보기"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
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

        {/* 본문 입력창 */}
        <textarea
          css={s.textAreaField}
          placeholder="피드 내용을 적어주세요!"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* 작성 완료 버튼 */}
        <button css={s.submitButton} onClick={handleSubmit}>
          작성 완료
        </button>
      </main>
      <BottomNavBar />
    </div>
  );
};

export default PostWrite;
