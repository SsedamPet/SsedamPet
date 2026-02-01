/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import * as s from "./styles";
import BottomNavBar from "../../components/layout/BottomNavBar/BottomNavBar";
import { api } from "../../configs/axiosConfig";

function AiChat() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "안녕하세요! 저는 반려동물 건강 상담 AI 멍냥닥터라고 해요! 저에게 무슨 기록을 남겨주실래요?",
    },
    { type: "user", text: "고양이가 요즘 지쳐 하는데 뭐가 문제일까요?" },
    {
      type: "bot",
      text: "구토는 다양한 원인이 있을 수 있습니다.\n*가벼운 경우**: 너무 빨리 먹어서, 헤어볼(고양이), 빗속에 위산 자극\n**중요가 필요한 경우**: 하루에 3회 이상 반복, 혈액이 섞임, 푹푹 처럼 보이면...",
    },
    {
      type: "bot",
      text: "최근 어떤 반려동물 추가하시면 무엇이 원인인지 알아볼게요.",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatAreaRef = useRef(null);

  useEffect(() => {
    // 메시지 업데이트 시 스크롤 최하단으로 이동
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() || isLoading) {
      const userMessageText = inputText;

      const now = new Date();
      // 사용자가 보낸 메시지 즉시 화면에 보여줌
      setMessages([...prev, { type: "user", text: userMessageText }]);
      setInputText("");
      // 실제 챗봇 API 연동 시 여기에 챗봇 응답 로직 추가
      try {
        // 실제 서버로 질문 날리는 코드
        const response = await api.post("/api/ai/chat", { text: inputText });

        // 서버에서 온 대답 추가
        const botMsg = { type: "bot", text: response.data };
        setMessages((prev) => [...prev, botMsg]);
      } catch (error) {
        console.error("챗봇 통신 에러:", error);
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "서버가 아픈가 봐요... 대답을 못 하겠어요." },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 상단 퀵 버튼 클릭 시 입력창에 텍스트 세팅
  const handleQuickButtonClick = (text) => {
    setInputText(text);
  };

  return (
    <div css={s.container}>
      <div css={s.chatArea} ref={chatAreaRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            css={msg.type === "user" ? s.userMessage : s.botMessage}
          >
            {msg.type === "bot" && <div className="avatar">🤖</div>}
            <div className="bubble">
              {msg.text.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
            {msg.type === "user" && <div className="avatar">🐱</div>}
          </div>
        ))}
        {/* AI가 답변 중일 때 표시할 로딩 UI */}
        {isLoading && (
          <div css={s.botMessage}>
            <div className="avatar">🤖</div>
            <div className="bubble">
              <p>쓰담쌤이 분석 중입니다...</p>
            </div>
          </div>
        )}
      </div>

      <div css={s.inputWrapper}>
        <div css={s.topButtonGroup}>
          <button className="topBtn">💊 질병 예방법</button>
          <button className="topBtn">🐱 생활 습관</button>
          <button className="topBtn">⚠️ 주의 사항</button>
        </div>

        <div css={s.inputArea}>
          <input
            type="text"
            placeholder={isLoading ? "답변을 기다리고 있습니다..." : "증상이나 궁금한 점을 입력하세요!"}
            value={inputText}
            disabled={isLoading}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button onClick={handleSendMessage} disabled={isLoading || !inputText.trim()}>➤</button>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
}

export default AiChat;
