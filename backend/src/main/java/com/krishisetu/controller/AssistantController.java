package com.krishisetu.controller;

import com.krishisetu.dto.ApiResponse;
import com.krishisetu.dto.ChatRequest;
import com.krishisetu.dto.ChatResponse;
import com.krishisetu.model.ChatMessage;
import com.krishisetu.model.User;
import com.krishisetu.repository.ChatMessageRepository;
import com.krishisetu.service.AiAssistantService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assistant")
public class AssistantController {

    private final AiAssistantService aiAssistantService;
    private final ChatMessageRepository chatMessageRepository;

    public AssistantController(AiAssistantService aiAssistantService, ChatMessageRepository chatMessageRepository) {
        this.aiAssistantService = aiAssistantService;
        this.chatMessageRepository = chatMessageRepository;
    }

    @PostMapping("/chat")
    public ResponseEntity<ApiResponse<ChatResponse>> chat(
            @AuthenticationPrincipal User user,
            @RequestBody ChatRequest req) {

        Long userId = user != null ? user.getId() : null;
        String lang = req.getPreferredLanguage() != null ? req.getPreferredLanguage() : (user != null ? user.getPreferredLanguage() : "en");

        ChatResponse response = aiAssistantService.processQuery(req.getMessage(), req.getSessionId(), userId, lang);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<ChatMessage>>> getHistory(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false) String sessionId) {

        List<ChatMessage> list;
        if (user != null) {
            list = chatMessageRepository.findByUserIdOrderByCreatedAtAsc(user.getId());
        } else if (sessionId != null && !sessionId.trim().isEmpty()) {
            list = chatMessageRepository.findBySessionIdOrderByCreatedAtAsc(sessionId);
        } else {
            list = List.of();
        }
        return ResponseEntity.ok(ApiResponse.success(list));
    }
}
