/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./styles";

const ProfileInformation = () => {
    return (
        <div css={s.rootContainer}>
            <main css={s.content}>
                <div css={s.infoCard}>
                    <div css={s.profileUploadCircle}>
                        <span className="upload-text">이미지 추가</span>
                    </div>
                    <div css={s.buttonGroup}>
                        <button type="button" css={s.selectionButton}>앨범</button>
                        <button type="button" css={s.selectionButton}>이모티콘</button>
                    </div>
                    <button css={s.nextButton}>다음</button>
                </div>
            </main>
        </div>
    );
};

export default ProfileInformation;