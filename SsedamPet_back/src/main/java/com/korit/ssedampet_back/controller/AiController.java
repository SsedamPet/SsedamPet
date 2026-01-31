package com.korit.ssedampet_back.controller;

import com.korit.ssedampet_back.dto.request.AiRequest;
import com.korit.ssedampet_back.service.AiService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Request;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AiController {
    private final OpenAiChatModel openAiChatModel;
    private final AiService aiService;

    @PostMapping
    public String chatBot(@RequestBody AiRequest airequest) {
        return aiService.chatBot(airequest);
    }
}
