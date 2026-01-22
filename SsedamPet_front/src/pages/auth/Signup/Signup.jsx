import BottomNavBar from "../../../components/layout/BottomNavBar/BottomNavBar";

function Signup() {
  return (
    <div css={s.rootContainer}>
      <div css={s.container}>
        <header css={s.headerBar}>LOGO</header>

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

      <BottomNavBar />
    </div>
  );
}

export default Signup;
