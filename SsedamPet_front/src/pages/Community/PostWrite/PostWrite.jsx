/** @jsxImportSource @emotion/react */
import { Bell, Plus, X } from "lucide-react";
import * as s from "./styles"; 

function PostWrite() {
  return (
    <div css={s.rootContainer}>
      <main css={s.content}>
        <div css={s.closeButton}>
          <X size={24} strokeWidth={2.5} color="#333" />
        </div>
        <select css={s.inputField}>
          <option value="">펫 선택하기</option>
        </select>
        <div css={s.imageUploadBox}>
          <Plus size={40} color="#999" />
        </div>
        <textarea css={s.textAreaField} placeholder="본문 내용 작성" />
        <button css={s.submitButton}>작성 완료</button>
      </main>
    </div>
  );
}

export default PostWrite;