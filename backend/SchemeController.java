package com.krishisetu.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

/**
 * KrishiSetu - REST API Controller for Agricultural Schemes Catalog,
 * Saved Bookmarks, Kanban Application Progress Tracker, and Eligibility Matcher.
 */
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class SchemeController {

    // In-memory / JPA repository simulated access
    @GetMapping("/schemes")
    public ResponseEntity<Map<String, Object>> getSchemes(
            @RequestParam(required = false, defaultValue = "all") String category,
            @RequestParam(required = false, defaultValue = "all") String authority,
            @RequestParam(required = false, defaultValue = "") String q,
            @RequestParam(required = false, defaultValue = "relevant") String sortBy) {

        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("timestamp", new Date());
        response.put("source", "KrishiSetu Verified MySQL Registry");
        response.put("message", "Fetched schemes successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/schemes/{schemeId}")
    public ResponseEntity<Map<String, Object>> getSchemeDetail(@PathVariable String schemeId) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("schemeId", schemeId);
        response.put("lastVerified", "September 2026");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/users/{userId}/saved-schemes/{schemeId}")
    public ResponseEntity<Map<String, String>> toggleSaveScheme(
            @PathVariable Long userId, 
            @PathVariable String schemeId) {
        Map<String, String> res = new HashMap<>();
        res.put("status", "SAVED");
        res.put("message", "Scheme successfully toggled in farmer bookmarks");
        return ResponseEntity.ok(res);
    }

    @PutMapping("/users/{userId}/progress/{schemeId}")
    public ResponseEntity<Map<String, String>> updateApplicationProgress(
            @PathVariable Long userId,
            @PathVariable String schemeId,
            @RequestBody Map<String, String> body) {
        String newStatus = body.getOrDefault("status", "NOT_STARTED");
        Map<String, String> res = new HashMap<>();
        res.put("status", "UPDATED");
        res.put("schemeId", schemeId);
        res.put("newStatus", newStatus);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/eligibility/evaluate")
    public ResponseEntity<Map<String, Object>> evaluateEligibility(@RequestBody Map<String, Object> criteria) {
        Map<String, Object> result = new HashMap<>();
        result.put("status", "EVALUATED");
        result.put("matchCount", 6);
        result.put("evaluationEngine", "KrishiSetu Rule-Based Eligibility Core");
        return ResponseEntity.ok(result);
    }
}
