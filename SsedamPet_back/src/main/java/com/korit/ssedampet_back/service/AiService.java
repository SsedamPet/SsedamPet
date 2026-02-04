package com.korit.ssedampet_back.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.korit.ssedampet_back.dto.request.AiRequest;
import com.korit.ssedampet_back.dto.response.aiChat.AiChatRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AiService {

    private final OpenAiChatModel openAiChatModel;
    private final ObjectMapper objectMapper;

    public AiChatRespDto chat(AiRequest airequest) {

        String template = """
                당신은 반려동물 건강 상담 서비스 '쓰담펫'의 전문 수의사 '멍냥닥터'입니다.
                
                [미션]
                사용자가 반려동물(강아지, 고양이 등)의 증상을 말하면, 
                전문적인 수의학 지식을 바탕으로 예상 원인과 대처법을 안내하세요.
                사용자의 반려동물 증상을 듣고 전문적인 답변을 제공한 뒤,\s
                보호자가 다음에 클릭할 법한 유용한 질문이나 행동을 3개의 버튼 키워드로 제안하세요.
                
                [답변 규칙]
                1. 말투: 보호자의 걱정하는 마음을 다독여주는 따뜻하고 다정한 말투를 사용하세요.
                2. 전문성: 의학적 근거를 바탕으로 설명하되, 초보 보호자도 이해하기 쉽게 비유를 섞어주세요.
                3. 구조: 1) 공감과 인사 2) 예상 원인 분석 3) 집에서 할 수 있는 응급처치 4) 병원 방문 필요성 순으로 대답하세요.
                        - 설명은 요약형으로 짧게 작성하세요.
                4. 경고: "이 답변은 참고용이며, 정확한 진단은 반드시 오프라인 동물병원에서 받으셔야 합니다"라는 문구를 마지막에 꼭 포함하세요.
                3. 버튼은 고정된 값을 쓰지 말고, 현재 상담 중인 질환이나 상황에 특화된 키워드로 만드세요.
                   - 예 (건강검진 클릭 시): ["나이별 검사항목", "검진 전 주의사항", "비용 안내"]
                
                [JSON 응답 구조]
                {{
                  "answer": "여기에 수의사 답변 내용을 넣으세요 (공감 + 원인분석 + 처치법 + 경고문구 포함)",
                  "buttons": ["동적버튼1", 동적버튼2", "동적버튼3"]
                }}
                사용자 증상: {message}
                """;

        PromptTemplate promptTemplate = new PromptTemplate(template);
        Prompt prompt = promptTemplate.create(Map.of("message", airequest.getText()));

        String responseJson = openAiChatModel.call(prompt).getResult().getOutput().getText();

        try {
            return objectMapper.readValue(responseJson, AiChatRespDto.class);
        } catch (Exception e) {
            return AiChatRespDto.builder()
                    .answer(responseJson)
                    .buttons(List.of("질병 예방법", "생활 습관", "주의 사항"))
                    .build();
        }
    }
}
