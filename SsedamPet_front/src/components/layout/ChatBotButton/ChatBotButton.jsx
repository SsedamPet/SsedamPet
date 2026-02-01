/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { useLocation, useNavigate } from "react-router-dom";

function ChatBotButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const hidePaths = ["/chatbot", "/auth/login", "/auth/signup"];
  if (hidePaths.includes(location.pathname)) return null;

  return (
    <div css={s.fixedBtn} onClick={() => navigate("/chatbot")}>
      <img src="/chatbot.png" alt="쓰담쌤" />
    </div>
  );
}

export default ChatBotButton;
