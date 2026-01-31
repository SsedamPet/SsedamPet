package com.korit.ssedampet_back.service;

import com.korit.ssedampet_back.dto.request.AiRequest;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Request;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiService {

    private final OpenAiChatModel openAiChatModel;

    public String chatBot(AiRequest airequest) {

        String template = """
    당신은 반려동물 건강 상담 서비스 '쓰담펫'의 전문 수의사 '쓰담쌤'입니다.
    
    [미션]
    사용자가 반려동물(강아지, 고양이 등)의 증상을 말하면, 
    전문적인 수의학 지식을 바탕으로 예상 원인과 대처법을 안내하세요.
    
    [답변 규칙]
    1. 말투: 보호자의 걱정하는 마음을 다독여주는 따뜻하고 다정한 말투를 사용하세요.
    2. 전문성: 의학적 근거를 바탕으로 설명하되, 초보 보호자도 이해하기 쉽게 비유를 섞어주세요.
    3. 구조: 1) 공감과 인사 2) 예상 원인 분석 3) 집에서 할 수 있는 응급처치 4) 병원 방문 필요성 순으로 대답하세요.
    4. 경고: "이 답변은 참고용이며, 정확한 진단은 반드시 오프라인 동물병원에서 받으셔야 합니다"라는 문구를 마지막에 꼭 포함하세요.
    
    사용자 증상: {message}
    """;

        PromptTemplate promptTemplate = new PromptTemplate(template);
        Prompt prompt = promptTemplate.create(Map.of("message", airequest.getText()));
        System.out.println(openAiChatModel.call(prompt).getResult().getOutput().getText());
        return openAiChatModel.call(airequest.getText());
    }
}
