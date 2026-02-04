/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import * as s from "./styles";

const Toast = ({ message, visible, onClose, duration = 2500 }) => {
    useEffect(() => {
        if (!visible) return;
        const t = setTimeout(() => onClose?.(), duration);
        return () => clearTimeout(t);
    }, [visible, duration, onClose]);

    

    if (!visible) return null;

    return (
        <div css={s.toastWrap} onClick={onClose} role="button" tabIndex={0}>
            <div css={s.toastBox}>{message}</div>
        </div>
    );
};

export default Toast;
