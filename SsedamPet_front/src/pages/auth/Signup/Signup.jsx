/** @jsxImportSource @emotion/react */
import React, { useState } from "react"; // useState 추가
import * as s from "./styles";

function Signup() {
  // 1. 에러 해결: formData 상태 변수 정의
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthDate: "",
    phone: "",
    nickname: ""
  });

  // 2. 에러 해결: 클릭 이벤트 함수 정의
  const handleNicknameCheck = () => {
    alert("닉네임 중복 확인");
  };

  const handleSubmit = () => {
    alert("회원가입 완료");
  };

  return (
    <div css={s.rootContainer}>
      <div css={s.container}>
        <main css={s.content}>
          <div css={s.inputRow}>
            <span css={s.label}>이름</span>
            <input css={s.fixedInput} value={formData.name} readOnly />
          </div>

          <div css={s.inputRow}>
            <span css={s.label}>이메일</span>
            <input css={s.fixedInput} value={formData.email} readOnly />
          </div>

          <div css={s.inputRow}>
            <span css={s.label}>생년월일</span>
            <input
              css={s.inputBox}
              placeholder="예: 19950101"
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
            />
          </div>

          <div css={s.inputRow}>
            <span css={s.label}>휴대전화</span>
            <input
              css={s.inputBox}
              placeholder="010-0000-0000"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div css={s.inputRow}>
            <span css={s.label}>닉네임</span>
            <div css={s.nicknameWrapper}>
              <input
                css={s.nicknameInput}
                value={formData.nickname}
                onChange={(e) =>
                  setFormData({ ...formData, nickname: e.target.value })
                }
              />
              <button css={s.checkButton} onClick={handleNicknameCheck}>
                중복확인
              </button>
            </div>
          </div>

          <div css={s.profileRow}>
            <span css={s.label}>프로필</span>
            <div css={s.profileCircleArea}>
              <div css={s.profileCircle}>이미지 추가</div>
            </div>
          </div>
        </main>

        <button css={s.submitButton} onClick={handleSubmit}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Signup;