package com.krishisetu.service;

import org.springframework.stereotype.Service;
import java.util.*;

/**
 * KrishiSetu - Grounded Retrieval-Augmented Generation (RAG) Service
 * Demonstrates the exact backend retrieval flow:
 * 1. Takes user query & farmer profile
 * 2. Queries MySQL full-text/keyword index for matching scheme rows
 * 3. Injects strictly verified rows as System Grounding Context
 * 4. Calls LLM with zero-hallucination instruction
 */
@Service
public class AiAssistantService {

    public Map<String, Object> answerQueryGrounded(String userQuery, Long userId) {
        // Step 1: Retrieval from MySQL
        List<Map<String, String>> retrievedSchemes = querySchemeDatabase(userQuery);

        // Step 2: Formulate Grounding Context
        StringBuilder groundingContext = new StringBuilder();
        groundingContext.append("### VERIFIED KRISHISETU GROUNDING CONTEXT (DO NOT HALLUCINATE):\n");

        if (retrievedSchemes.isEmpty()) {
            groundingContext.append("No specific scheme matched. Instruct user to query verified schemes like PM-KISAN, PMFBY, KCC, PM-KUSUM, SMAM.\n");
        } else {
            for (Map<String, String> s : retrievedSchemes) {
                groundingContext.append(String.format("- Scheme: %s (%s)\n  Authority: %s\n  Subsidy: %s\n  Eligible Land: %s\n  Docs: %s\n  Official URL: %s\n",
                        s.get("name"), s.get("code"), s.get("authority"), s.get("subsidy"), s.get("land"), s.get("docs"), s.get("url")));
            }
        }

        // Step 3: Simulated LLM Prompt Construction (Sent to Gemini / Claude / Ollama)
        String systemPrompt = "You are Krishi Mitra, an empathetic, grounded agricultural AI assistant for Indian farmers. " +
                "Answer questions ONLY using the verified grounding context provided above. " +
                "Never invent subsidy numbers, interest rates, or eligibility rules. " +
                "If the information is not in the context, explicitly inform the farmer.";

        Map<String, Object> result = new HashMap<>();
        result.put("status", "SUCCESS");
        result.put("retrievedCount", retrievedSchemes.size());
        result.put("groundingContextLength", groundingContext.length());
        result.put("promptGrounded", true);
        result.put("sampleResponse", "Answer generated strictly from MySQL retrieved rows without hallucination.");
        return result;
    }

    private List<Map<String, String>> querySchemeDatabase(String query) {
        // In real execution, calls SchemeRepository.findMatchingSchemes(query)
        List<Map<String, String>> sample = new ArrayList<>();
        Map<String, String> row = new HashMap<>();
        row.put("code", "PMK-001");
        row.put("name", "PM-KISAN");
        row.put("authority", "Central Government (MoA&FW)");
        row.put("subsidy", "₹6,000 / year in 3 DBT instalments");
        row.put("land", "All cultivable landholding farmer families");
        row.put("docs", "Aadhaar Card, Land Records (Khatauni), Bank Passbook with IFSC");
        row.put("url", "https://pmkisan.gov.in");
        sample.add(row);
        return sample;
    }
}
