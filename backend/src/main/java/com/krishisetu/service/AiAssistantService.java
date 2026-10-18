package com.krishisetu.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.krishisetu.dto.ChatResponse;
import com.krishisetu.model.ChatMessage;
import com.krishisetu.model.Scheme;
import com.krishisetu.model.SchemeDocument;
import com.krishisetu.repository.ChatMessageRepository;
import com.krishisetu.repository.SchemeRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AiAssistantService {

    private final SchemeRepository schemeRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public AiAssistantService(SchemeRepository schemeRepository, ChatMessageRepository chatMessageRepository) {
        this.schemeRepository = schemeRepository;
        this.chatMessageRepository = chatMessageRepository;
    }

    public ChatResponse processQuery(String userQuery, String sessionId, Long userId, String lang) {
        if (userQuery == null || userQuery.trim().isEmpty()) {
            return new ChatResponse("Please ask a question about agricultural welfare schemes, eligibility, or documents.", "empty", List.of(), List.of("PM-KISAN Documents?", "Solar Pump Subsidy?", "KCC Loan?"), true);
        }

        String rawQuery = userQuery.trim();
        String q = rawQuery.toLowerCase();
        boolean isHi = "hi".equalsIgnoreCase(lang) || containsDevanagari(rawQuery);

        // Fetch recent context for session if available
        List<ChatMessage> recentMessages = sessionId != null ?
                chatMessageRepository.findBySessionIdOrderByCreatedAtAsc(sessionId) : Collections.emptyList();
        String lastDiscussedSchemeId = extractLastDiscussedSchemeId(recentMessages);

        // 1. Intent Detection
        String intent = detectIntent(q);

        // Handle Greetings / Small talk
        if ("greeting".equals(intent)) {
            String greeting = isHi ?
                    "नमस्ते! मैं कृषि मित्र हूँ। मैं आपको सरकारी व गैर-सरकारी योजनाओं, सब्सिडी, आवश्यक दस्तावेज़ों और आवेदन प्रक्रिया की सटीक जानकारी दे सकता हूँ। आप किस योजना या आवश्यकता के बारे में जानना चाहते हैं?" :
                    "Hello! I am Krishi Mitra, your grounded agricultural assistant. I can guide you on 36+ verified Central, State, and CSR welfare schemes, subsidy eligibility, and application procedures. How can I help you today?";
            List<String> chips = isHi ?
                    List.of("ड्रिप व सोलर पंप योजनाएं", "पीएम-किसान दस्तावेज़", "केसीसी 4% लोन", "मेरी सहेजी गई योजनाएं") :
                    List.of("Irrigation & Solar Pump?", "PM-KISAN Documents?", "KCC 4% Interest?", "My Saved Schemes");
            saveMessage(userId, sessionId, ChatMessage.Role.user, rawQuery, null);
            saveMessage(userId, sessionId, ChatMessage.Role.assistant, greeting, null);
            return new ChatResponse(greeting, intent, List.of(), chips, true);
        }

        // Handle Out of Scope
        if ("out_of_scope".equals(intent)) {
            String outOfScopeMsg = isHi ?
                    "क्षमा करें, मैं केवल कृषि कल्याण योजनाओं, सब्सिडी, दस्तावेज़ों और आवेदन प्रक्रियाओं की सत्यापित जानकारी प्रदान करने के लिए अधिकृत हूँ। मौसम के सामान्य पूर्वानुमान या राजनीतिक विषयों पर मैं सलाह नहीं दे सकता।" :
                    "I specialize strictly in agricultural welfare schemes, subsidies, eligibility, required documents, and application steps. I cannot advise on general weather forecasts, politics, or unrelated topics. Please ask me about agricultural schemes.";
            List<String> chips = isHi ?
                    List.of("पीएम-किसान", "फसल बीमा", "सोलर पंप सब्सिडी", "ट्रैक्टर सब्सिडी") :
                    List.of("PM-KISAN", "PMFBY Crop Insurance", "PM-KUSUM Solar", "SMAM Machinery");
            saveMessage(userId, sessionId, ChatMessage.Role.user, rawQuery, null);
            saveMessage(userId, sessionId, ChatMessage.Role.assistant, outOfScopeMsg, null);
            return new ChatResponse(outOfScopeMsg, intent, List.of(), chips, true);
        }

        // Contextual follow-up check: e.g. "what documents do I need for it?" or "how to apply for it?"
        boolean isFollowUp = (q.contains("for it") || q.contains("for this") || q.contains("iske liye") || q.contains("इसके लिए")) && lastDiscussedSchemeId != null;
        if (isFollowUp) {
            Optional<Scheme> targetScheme = schemeRepository.findById(lastDiscussedSchemeId);
            if (targetScheme.isPresent()) {
                Scheme s = targetScheme.get();
                if (intent.contains("documents") || q.contains("document") || q.contains("dastavej") || q.contains("कागजात")) {
                    String reply = (isHi ? "योजना के लिए आवश्यक दस्तावेज़: " : "Required documents for ") + (isHi ? s.getNameHi() : s.getNameEn());
                    return buildSchemeSpecificResponse(reply, s, isHi, userId, sessionId, rawQuery, "documents_followup");
                }
                if (intent.contains("apply") || q.contains("apply") || q.contains("aavedan") || q.contains("register")) {
                    String reply = (isHi ? "आवेदन करने के चरण: " : "Step-by-step application guidance for ") + (isHi ? s.getNameHi() : s.getNameEn());
                    return buildSchemeSpecificResponse(reply, s, isHi, userId, sessionId, rawQuery, "apply_followup");
                }
            }
        }

        // 2. Retrieval: Search & Ranked Scoring across all active schemes
        List<Scheme> allSchemes = schemeRepository.findByActiveTrue();
        List<ScoredScheme> scored = scoreSchemes(q, allSchemes);

        if (scored.isEmpty() || scored.get(0).score < 2) {
            String fallback = isHi ?
                    "माफ़ कीजिये, मुझे इस प्रश्न से मेल खाती कोई सटीक योजना नहीं मिली। कृपया योजना का नाम (जैसे पीएम-किसान, केसीसी, सोलर पंप) या अपनी आवश्यकता (सिंचाई, खाद, लोन, बीमा) लिखकर पूछें।" :
                    "I could not locate an exact match for that query in our verified agricultural database. As a grounded assistant, I strictly avoid guessing subsidy figures or eligibility rules. You can ask me about: Direct Income, Crop Insurance, Low-Interest Loans, Irrigation, or Machinery.";
            List<String> chips = isHi ?
                    List.of("सिंचाई / ड्रिप योजना", "फसल बीमा (पीएमएफबीवाई)", "केसीसी 4% लोन", "पीएम-किसान") :
                    List.of("Irrigation & Solar Pump", "PMFBY Crop Insurance", "KCC 4% Loan", "PM-KISAN");
            saveMessage(userId, sessionId, ChatMessage.Role.user, rawQuery, null);
            saveMessage(userId, sessionId, ChatMessage.Role.assistant, fallback, null);
            return new ChatResponse(fallback, "not_found", List.of(), chips, true);
        }

        // Format top matched schemes
        List<ScoredScheme> topMatches = scored.stream().limit(3).toList();
        List<Map<String, Object>> schemeCards = new ArrayList<>();
        List<String> schemeIds = new ArrayList<>();

        for (ScoredScheme sc : topMatches) {
            Scheme s = sc.scheme;
            schemeIds.add(s.getId());
            Map<String, Object> card = new HashMap<>();
            card.put("id", s.getId());
            card.put("code", s.getCode());
            card.put("name", isHi ? s.getNameHi() : s.getNameEn());
            card.put("subsidy", s.getSubsidyHighlight());
            card.put("target", s.getTargetBeneficiary());
            card.put("officialUrl", s.getOfficialUrl());
            card.put("applyUrl", s.getApplyUrl());

            // Add verified proof document if available
            if (s.getOfficialDocuments() != null && !s.getOfficialDocuments().isEmpty()) {
                SchemeDocument doc = s.getOfficialDocuments().get(0);
                card.put("documentTitle", doc.getTitle());
                card.put("documentUrl", doc.getUrl());
            }

            card.put("reason", sc.matchReason);
            schemeCards.add(card);
        }

        // 4. Construct Natural Language Answer
        String primarySchemeName = isHi ? topMatches.get(0).scheme.getNameHi() : topMatches.get(0).scheme.getNameEn();
        String answer;
        if (topMatches.size() == 1) {
            answer = isHi ?
                    "आपकी आवश्यकता के लिए यह सत्यापित योजना उपलब्ध है: **" + primarySchemeName + "**। नीचे दिए गए कार्ड से सीधे विवरण देखें या पोर्टल पर आवेदन करें।" :
                    "Here is the verified scheme matching your requirement: **" + primarySchemeName + "**. You can review eligibility, required documents, or apply directly below.";
        } else {
            answer = isHi ?
                    "आपकी आवश्यकता के लिए ये " + topMatches.size() + " सत्यापित योजनाएं उपलब्ध हैं। प्रमुख योजना: **" + primarySchemeName + "**।" :
                    "I found " + topMatches.size() + " verified welfare schemes matching your inquiry. Top match: **" + primarySchemeName + "**.";
        }

        List<String> followUps = isHi ?
                List.of("आवश्यक दस्तावेज़?", "आवेदन कैसे करें?", "पात्रता शर्तें?", "अन्य विकल्प?") :
                List.of("Documents needed?", "How to apply?", "Am I eligible?", "Other options?");

        saveMessage(userId, sessionId, ChatMessage.Role.user, rawQuery, null);
        saveMessage(userId, sessionId, ChatMessage.Role.assistant, answer, schemeIds);

        return new ChatResponse(answer, intent, schemeCards, followUps, true);
    }

    private String detectIntent(String q) {
        if (q.matches("^(hi|hello|hey|namaste|pranam|ram ram|नमस्ते|प्रणाम).*")) return "greeting";
        if (q.contains("weather") || q.contains("rain tomorrow") || q.contains("cricket") || q.contains("modi") || q.contains("election") || q.contains("politics")) {
            return "out_of_scope";
        }
        if (q.contains("document") || q.contains("checklist") || q.contains("kaagaz") || q.contains("कागजात") || q.contains("दस्तावेज")) {
            return "documents";
        }
        if (q.contains("how to apply") || q.contains("apply") || q.contains("register") || q.contains("procedure") || q.contains("आवेदन कैसे करें")) {
            return "how_to_apply";
        }
        if (q.contains("eligible") || q.contains("eligibility") || q.contains("patrata") || q.contains("पात्रता") || q.contains("qualify")) {
            return "eligibility";
        }
        if (q.contains("compare") || q.contains("difference") || q.contains("tulna") || q.contains("तुलना")) {
            return "compare";
        }
        if (q.contains("saved") || q.contains("bookmark") || q.contains("my progress") || q.contains("status")) {
            return "my_saved";
        }
        return "scheme_inquiry";
    }

    private List<ScoredScheme> scoreSchemes(String q, List<Scheme> allSchemes) {
        List<ScoredScheme> list = new ArrayList<>();

        // Synonym keywords mapping
        Map<String, String[]> keywordClusters = new HashMap<>();
        keywordClusters.put("irrigation", new String[]{"irrigation", "sinchai", "pani", "water", "drip", "sprinkler", "borewell", "pump", "सिंचाई", "ड्रिप", "फुहारा", "बोरवेल"});
        keywordClusters.put("solar", new String[]{"solar", "kusum", "solar pump", "सौर ऊर्जा", "सोलर"});
        keywordClusters.put("insurance", new String[]{"insurance", "bima", "fasal bima", "crop insurance", "loss", "drought", "flood", "damage", "मुआवजा", "बीमा", "नुकसान", "बाढ़"});
        keywordClusters.put("credit", new String[]{"loan", "credit", "kcc", "interest", "karz", "rin", "लोन", "ऋण", "कर्ज", "केसीसी", "ब्याज"});
        keywordClusters.put("mechanization", new String[]{"tractor", "machinery", "machine", "rotavator", "harvester", "drone", "equipment", "यंत्र", "ट्रैक्टर", "मशीन"});
        keywordClusters.put("organic", new String[]{"organic", "natural", "jaivik", "prakritik", "compost", "chemical free", "जैविक", "प्राकृतिक"});
        keywordClusters.put("pension", new String[]{"pension", "maan dhan", "old age", "vridhavastha", "पेंशन", "मानधन"});
        keywordClusters.put("horticulture", new String[]{"horticulture", "fruits", "vegetables", "polyhouse", "flowers", "bagwani", "बागवानी", "फल", "सब्जी"});
        keywordClusters.put("dairy", new String[]{"dairy", "milk", "cow", "gokul", "livestock", "goat", "poultry", "pashudhan", "गाय", "डेयरी", "दुग्ध", "पशुपालन", "बकरी"});
        keywordClusters.put("fisheries", new String[]{"fish", "fisheries", "matsya", "machhli", "मत्स्य", "मछली"});
        keywordClusters.put("income", new String[]{"income", "pm kisan", "6000", "samman", "dbt", "सम्मान", "आय"});

        for (Scheme s : allSchemes) {
            int score = 0;
            String reason = "Matched relevant welfare criteria";

            String nameEn = s.getNameEn().toLowerCase();
            String nameHi = s.getNameHi() != null ? s.getNameHi().toLowerCase() : "";
            String category = s.getCategory().getNameEn().toLowerCase();
            String summary = s.getSummaryEn().toLowerCase();
            String keywords = s.getKeywords() != null ? s.getKeywords().toLowerCase() : "";

            // Direct name hit (highest weight)
            if (nameEn.contains(q) || nameHi.contains(q) || s.getId().replace("-", "").contains(q.replace("-", ""))) {
                score += 25;
                reason = "Direct scheme title match";
            }

            // Keyword cluster matching
            for (Map.Entry<String, String[]> entry : keywordClusters.entrySet()) {
                for (String syn : entry.getValue()) {
                    if (q.contains(syn)) {
                        if (nameEn.contains(entry.getKey()) || category.contains(entry.getKey()) || keywords.contains(entry.getKey()) || summary.contains(entry.getKey())) {
                            score += 8;
                            reason = "Matches " + entry.getKey() + " needs";
                        }
                    }
                }
            }

            // Specific terms in scheme keywords or tags
            String[] tokens = q.split("\\s+");
            for (String t : tokens) {
                if (t.length() > 2) {
                    if (keywords.contains(t)) score += 4;
                    if (nameEn.contains(t) || nameHi.contains(t)) score += 6;
                    if (category.contains(t)) score += 5;
                    if (summary.contains(t)) score += 2;
                }
            }

            if (score > 0) {
                list.add(new ScoredScheme(s, score, reason));
            }
        }

        list.sort((a, b) -> Integer.compare(b.score, a.score));
        return list;
    }

    private ChatResponse buildSchemeSpecificResponse(String heading, Scheme s, boolean isHi, Long userId, String sessionId, String rawQuery, String intent) {
        Map<String, Object> card = new HashMap<>();
        card.put("id", s.getId());
        card.put("code", s.getCode());
        card.put("name", isHi ? s.getNameHi() : s.getNameEn());
        card.put("subsidy", s.getSubsidyHighlight());
        card.put("target", s.getTargetBeneficiary());
        card.put("officialUrl", s.getOfficialUrl());
        card.put("applyUrl", s.getApplyUrl());

        if (s.getOfficialDocuments() != null && !s.getOfficialDocuments().isEmpty()) {
            card.put("documentTitle", s.getOfficialDocuments().get(0).getTitle());
            card.put("documentUrl", s.getOfficialDocuments().get(0).getUrl());
        }

        saveMessage(userId, sessionId, ChatMessage.Role.user, rawQuery, null);
        saveMessage(userId, sessionId, ChatMessage.Role.assistant, heading, List.of(s.getId()));

        List<String> followUps = isHi ?
                List.of("आवेदन कैसे करें?", "आधिकारिक पोर्टल ↗", "पात्रता शर्तें?") :
                List.of("How to apply?", "Official Portal ↗", "Am I eligible?");

        return new ChatResponse(heading, intent, List.of(card), followUps, true);
    }

    private String extractLastDiscussedSchemeId(List<ChatMessage> messages) {
        if (messages == null || messages.isEmpty()) return null;
        for (int i = messages.size() - 1; i >= 0; i--) {
            ChatMessage m = messages.get(i);
            if (m.getRole() == ChatMessage.Role.assistant && m.getSchemeIds() != null && !m.getSchemeIds().isEmpty()) {
                try {
                    List<String> ids = objectMapper.readValue(m.getSchemeIds(), new TypeReference<>() {});
                    if (!ids.isEmpty()) return ids.get(0);
                } catch (Exception ignored) {}
            }
        }
        return null;
    }

    private void saveMessage(Long userId, String sessionId, ChatMessage.Role role, String content, List<String> schemeIds) {
        if (sessionId == null) return;
        try {
            String jsonIds = schemeIds != null ? objectMapper.writeValueAsString(schemeIds) : null;
            chatMessageRepository.save(new ChatMessage(userId, sessionId, role, content, jsonIds));
        } catch (Exception ignored) {}
    }

    private boolean containsDevanagari(String s) {
        return s.codePoints().anyMatch(cp -> Character.UnicodeBlock.of(cp) == Character.UnicodeBlock.DEVANAGARI);
    }

    private static class ScoredScheme {
        Scheme scheme;
        int score;
        String matchReason;

        ScoredScheme(Scheme scheme, int score, String matchReason) {
            this.scheme = scheme;
            this.score = score;
            this.matchReason = matchReason;
        }
    }
}
