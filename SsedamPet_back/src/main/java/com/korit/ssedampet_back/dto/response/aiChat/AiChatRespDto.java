package com.korit.ssedampet_back.dto.response.aiChat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiChatRespDto {
    private String answer;
    private List<String> buttons;
}
