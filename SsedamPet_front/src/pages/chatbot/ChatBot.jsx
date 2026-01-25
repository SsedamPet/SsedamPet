// src/pages/chatbot/ChatBot.jsx
/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from "react";
import * as s from "./styles";
import BottomNavBar from "../../components/layout/BottomNavBar/BottomNavBar";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: '안녕하세요! 저는 반려동물 건강 상담 AI 멍냥닥터라고 해요! 저에게 무슨 기록을 남겨주실래요?'},
    { type: 'user', text: '고양이가 요즘 지쳐 하는데 뭐가 문제일까요?'},
    { type: 'bot', text: '구토는 다양한 원인이 있을 수 있습니다.\n*가벼운 경우**: 너무 빨리 먹어서, 헤어볼(고양이), 빗속에 위산 자극\n**중요가 필요한 경우**: 하루에 3회 이상 반복, 혈액이 섞임, 푹푹 처럼 보이면...' },
    { type: 'bot', text: '최근 어떤 반려동물 추가하시면 무엇이 원인인지 알아볼게요.'},
  ]);
  const [inputText, setInputText] = useState("");
  const chatAreaRef = useRef(null);

  useEffect(() => {
    // 메시지 업데이트 시 스크롤 최하단으로 이동
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const now = new Date();
      setMessages([...messages, { type: 'user', text: inputText,}]);
      setInputText('');
      // 실제 챗봇 API 연동 시 여기에 챗봇 응답 로직 추가
    }
  };

  return (
    <div css={s.container}>
      <div css={s.chatArea} ref={chatAreaRef}>
        {messages.map((msg, index) => (
          <div key={index} css={msg.type === 'user' ? s.userMessage : s.botMessage}>
            {msg.type === 'bot' && <div className="avatar">🤖</div>}
            <div className="bubble">
              {msg.text.split('\n').map((line, i) => <p key={i}>{line}</p>)}
            </div>
            {msg.type === 'user' && <div className="avatar">🐱</div>}
          </div>
        ))}
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
            placeholder="당신이 궁금한 질문에 대해 물어보세요!"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
          />
          <button onClick={handleSendMessage}>➤</button>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default ChatBot;