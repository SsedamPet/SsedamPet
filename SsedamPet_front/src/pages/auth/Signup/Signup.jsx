/** @jsxImportSource @emotion/react */
import React, { use, useEffect, useState } from "react"; // useState 추가
import * as s from "./styles";
import { useSearchParams } from "react-router-dom";
import { api } from "../../../configs/axiosConfig";

function Signup() {
  const [searchParams] = useSearchParams();
  // 1. 에러 해결: formData 상태 변수 정의
  const [signupData, setSignupData] = useState({
    name: searchParams.get("nickname"),
    email: searchParams.get("email"),
    birthDate: "",
    phone: "",
    nickname: "",
    profileImgFile: null,
    provider: searchParams.get("provider"),
    providerUserId: searchParams.get("providerUserId"),
  });

  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const [isValidNickname, setValidNickname] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // 2. 에러 해결: 클릭 이벤트 함수 정의
  const handleNicknameCheck = async () => {
    const response = await api.get(
      "/api/auth/valid/nickname?nickname=" + signupData.nickname,
    );
    setValidNickname(response.data);
    if (!response.data) {
      alert("이미 사용중인 닉네임입니다. 다시 입력하세요.");
    }
  };

  const handleProfileImgOnClick = () => {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "file");
    inputElement.click();
    inputElement.onchange = (e) => {
      const files = e.target.files;
      const [file] = files;
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setProfileImagePreview(e.target.result);
      };
      fileReader.readAsDataURL(file);
      setSignupData((prev) => {
        return {
          ...prev,
          profileImgFile: file,
        };
      });
    };
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("email", signupData.email);
    formData.append("name", signupData.name);
    formData.append("birthDate", signupData.birthDate);
    formData.append("phone", signupData.phone);
    formData.append("nickname", signupData.nickname);
    formData.append("profileImgFile", signupData.profileImgFile);
    formData.append("provider", signupData.provider);
    formData.append("providerUserId", signupData.providerUserId);

    try {
      const response = await api.post("/api/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/formData",
        },
      });

      console.log(response);
      const accessToken = response.data;
      if (accessToken) {
        localStorage.setItem("AccessToken", accessToken);
        alert("회원가입 완료");

      }
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 중 오류가 발생했습니다.")
    }
  };

  const handleInputOnChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    const isValid =
      !Object.values(signupData)
        .map((value) => !!value)
        .includes(false) && isValidNickname;
    setDisabled(!isValid);
  }, [signupData, isValidNickname]);

  return (
    <div css={s.rootContainer}>
      <div css={s.container}>
        <main css={s.content}>
          <div css={s.inputRow}>
            <span css={s.label}>이름</span>
            <input
              css={s.fixedInput}
              name="name"
              value={signupData.name}
              readOnly
            />
          </div>

          <div css={s.inputRow}>
            <span css={s.label}>이메일</span>
            <input
              css={s.fixedInput}
              name="email"
              value={signupData.email}
              readOnly
            />
          </div>

          <div css={s.inputRow}>
            <span css={s.label}>생년월일</span>
            <input
              css={s.inputBox}
              placeholder="예: 19950101"
              name="birthDate"
              value={signupData.birthDate}
              onChange={handleInputOnChange}
            />
          </div>

          <div css={s.inputRow}>
            <span css={s.label}>휴대전화</span>
            <input
              css={s.inputBox}
              placeholder="010-0000-0000"
              name="phone"
              value={signupData.phone}
              onChange={handleInputOnChange}
            />
          </div>

          <div css={s.inputRow}>
            <span css={s.label}>닉네임</span>
            <div css={s.nicknameWrapper}>
              <input
                css={s.nicknameInput}
                name="nickname"
                value={signupData.nickname}
                onChange={handleInputOnChange}
              />
              <button css={s.checkButton} onClick={handleNicknameCheck}>
                중복확인
              </button>
            </div>
          </div>

          <div css={s.profileRow}>
            <span css={s.label}>프로필</span>
            <div css={s.profileCircleArea}>
              <div
                css={s.profileCircle(profileImagePreview)}
                onClick={handleProfileImgOnClick}
              >
                {!profileImagePreview && "이미지 추가"}
              </div>
            </div>
          </div>
        </main>

        <button css={s.submitButton} disabled={disabled} onClick={handleSubmit}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Signup;
