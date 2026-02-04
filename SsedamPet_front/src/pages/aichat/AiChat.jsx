/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import * as s from "./styles";
import BottomNavBar from "../../components/layout/BottomNavBar/BottomNavBar";
import { api } from "../../configs/axiosConfig";

function AiChat() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "안녕하세요! 저는 반려동물 건강 상담 AI 멍냥닥터라고 해요! 무엇이든 물어보세요!",
      buttons: ["🏥 건강 검진 가이드", "🏠 생활 관리", "🏥 병원 가이드"],
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

  const handleSendMessage = async (forcedText = "") => {
    // 버튼 클릭 시 텍스트를 더 구체적인 질문으로 변환
    let textToSend =
      typeof forcedText === "string" && forcedText.trim() !== ""
        ? forcedText
        : inputText;

    // 특정 가이드 버튼 클릭 시 질문을 상세화하여 AI의 고정 답변을 방지합니다
    if (forcedText === "🏥 건강 검진 가이드") {
      textToSend =
        "반려동물의 생애주기별 필수 건강 검진 항목과 연령대별 주의사항을 상세히 알려줘.";
    } else if (forcedText === "🏠 생활 관리") {
      textToSend =
        "반려동물의 건강을 위한 일상적인 사료 관리 및 환경 조성 팁을 알려줘.";
    } else if (forcedText === "🏥 병원 가이드") {
      textToSend =
        "동물병원 방문 전 준비사항과 우리 아이에게 맞는 병원을 고르는 법을 알려줘.";
    }

    if (
      !textToSend ||
      typeof textToSend !== "string" ||
      !textToSend.trim() ||
      isLoading
    )
      return;

    setIsLoading(true); // 로딩 시작
    const userMsg = { type: "user", text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    try {
      // 실제 서버로 질문 날리는 코드
      const response = await api.post("/api/ai/chat", { text: textToSend });

      // 서버에서 온 대답 추가
      console.log(response.data);
      const botMsg = {
        type: "bot",
        text: response.data.answer || "답변을 생성하지 못했습니다.",
        buttons: response.data.buttons || [],
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("챗봇 통신 에러:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "서버 연결에 실패했어요. 잠시 후 다시 시도해주세요.",
          buttons: [],
        },
      ]);
    } finally {
      setIsLoading(false);
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

            <div className="message-content">
              <div className="bubble">
                {msg.text?.split("\n").map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              {/* 챗봇의 답변이면서 버튼 데이터가 있을 때만 해당 말풍선 아래에 버튼 생성 */}
              {msg.type === "bot" && msg.buttons && msg.buttons.length > 0 && (
                <div css={s.bubbleButtons}>
                  {msg.buttons.map((btnText, i) => (
                    <button
                      key={i}
                      className="quick-btn"
                      onClick={() => handleSendMessage(btnText)}
                    >
                      {btnText}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {msg.type === "user" && <div className="avatar">🐱</div>}
          </div>
        ))}
        {/* AI가 답변 중일 때 표시할 로딩 UI */}
        {isLoading && (
          <div css={s.botMessage}>
            <div className="avatar">🤖</div>
            <div className="bubble">
              <p> 잠시만 기다려주세요...</p>
            </div>
          </div>
        )}
      </div>

      <div css={s.inputWrapper}>
        <div css={s.inputArea}>
          <input
            type="text"
            placeholder={
              isLoading
                ? "답변을 기다리고 있습니다..."
                : "증상이나 궁금한 점을 입력하세요!"
            }
            value={inputText}
            disabled={isLoading}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputText.trim()}
          >
            ➤
          </button>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
}

export default AiChat;
