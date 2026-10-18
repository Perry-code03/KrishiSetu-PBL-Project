package com.krishisetu.controller;

import com.krishisetu.dto.ApiResponse;
import com.krishisetu.model.AuthAuditLog;
import com.krishisetu.model.Scheme;
import com.krishisetu.repository.*;
import com.krishisetu.service.SchemeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final SchemeService schemeService;
    private final UserRepository userRepository;
    private final SavedSchemeRepository savedSchemeRepository;
    private final ApplicationProgressRepository progressRepository;
    private final AuthAuditLogRepository auditLogRepository;

    public AdminController(
            SchemeService schemeService,
            UserRepository userRepository,
            SavedSchemeRepository savedSchemeRepository,
            ApplicationProgressRepository progressRepository,
            AuthAuditLogRepository auditLogRepository) {
        this.schemeService = schemeService;
        this.userRepository = userRepository;
        this.savedSchemeRepository = savedSchemeRepository;
        this.progressRepository = progressRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @PostMapping("/schemes")
    public ResponseEntity<ApiResponse<Scheme>> createScheme(@RequestBody Scheme scheme) {
        Scheme saved = schemeService.saveScheme(scheme);
        return ResponseEntity.ok(ApiResponse.success(saved));
    }

    @PutMapping("/schemes/{id}")
    public ResponseEntity<ApiResponse<Scheme>> updateScheme(@PathVariable String id, @RequestBody Scheme scheme) {
        scheme.setId(id);
        Scheme updated = schemeService.saveScheme(scheme);
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @DeleteMapping("/schemes/{id}")
    public ResponseEntity<ApiResponse<Map<String, String>>> deleteScheme(@PathVariable String id) {
        schemeService.deleteScheme(id);
        return ResponseEntity.ok(ApiResponse.success(Map.of("message", "Scheme deleted successfully", "id", id)));
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAdminStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalSchemes", schemeService.getAllSchemes("all", "", "relevant").size());
        stats.put("totalBookmarks", savedSchemeRepository.count());
        stats.put("totalApplicationsTracked", progressRepository.count());
        List<AuthAuditLog> recentLogs = auditLogRepository.findTop50ByOrderByCreatedAtDesc();
        stats.put("recentAuditLogs", recentLogs);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
