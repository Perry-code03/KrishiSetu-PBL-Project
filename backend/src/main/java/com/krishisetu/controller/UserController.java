package com.krishisetu.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.krishisetu.dto.*;
import com.krishisetu.model.ApplicationProgress;
import com.krishisetu.model.EligibilitySubmission;
import com.krishisetu.model.Notification;
import com.krishisetu.model.Scheme;
import com.krishisetu.model.User;
import com.krishisetu.service.AuthService;
import com.krishisetu.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;
    private final AuthService authService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public UserController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    // Profile & Settings
    @PutMapping("/users/me")
    public ResponseEntity<ApiResponse<UserDto>> updateProfile(
            @AuthenticationPrincipal User user,
            @RequestBody UserDto.ProfileDto profileDto) {
        UserDto updated = authService.updateProfile(user.getId(), profileDto);
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @PutMapping("/users/me/password")
    public ResponseEntity<ApiResponse<Map<String, String>>> changePassword(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody ChangePasswordRequest request) {
        authService.changePassword(user.getId(), request);
        return ResponseEntity.ok(ApiResponse.success(Map.of("message", "Password changed successfully")));
    }

    @DeleteMapping("/users/me")
    public ResponseEntity<ApiResponse<Map<String, String>>> deleteAccount(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, String> body) {
        String password = body.getOrDefault("password", "");
        authService.deleteAccount(user.getId(), password);
        return ResponseEntity.ok(ApiResponse.success(Map.of("message", "Account deleted successfully")));
    }

    // Saved Schemes (Bookmarks)
    @GetMapping("/me/saved")
    public ResponseEntity<ApiResponse<List<Scheme>>> getSavedSchemes(@AuthenticationPrincipal User user) {
        List<Scheme> list = userService.getSavedSchemes(user.getId());
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @PostMapping("/me/saved/{schemeId}")
    public ResponseEntity<ApiResponse<Map<String, String>>> saveScheme(
            @AuthenticationPrincipal User user,
            @PathVariable String schemeId) {
        userService.saveScheme(user.getId(), schemeId);
        return ResponseEntity.ok(ApiResponse.success(Map.of("status", "SAVED", "schemeId", schemeId)));
    }

    @DeleteMapping("/me/saved/{schemeId}")
    public ResponseEntity<ApiResponse<Map<String, String>>> removeSavedScheme(
            @AuthenticationPrincipal User user,
            @PathVariable String schemeId) {
        userService.removeSavedScheme(user.getId(), schemeId);
        return ResponseEntity.ok(ApiResponse.success(Map.of("status", "REMOVED", "schemeId", schemeId)));
    }

    @PostMapping("/me/saved/merge")
    public ResponseEntity<ApiResponse<Map<String, Object>>> mergeSavedSchemes(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, List<String>> body) {
        List<String> schemeIds = body.get("schemeIds");
        userService.mergeSavedSchemes(user.getId(), schemeIds);
        List<Scheme> updatedList = userService.getSavedSchemes(user.getId());
        return ResponseEntity.ok(ApiResponse.success(Map.of("mergedCount", updatedList.size(), "schemes", updatedList)));
    }

    // Application Progress (Kanban Tracker)
    @GetMapping("/me/progress")
    public ResponseEntity<ApiResponse<List<ApplicationProgress>>> getProgress(@AuthenticationPrincipal User user) {
        List<ApplicationProgress> list = userService.getProgress(user.getId());
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @PutMapping("/me/progress/{schemeId}")
    public ResponseEntity<ApiResponse<ApplicationProgress>> updateProgress(
            @AuthenticationPrincipal User user,
            @PathVariable String schemeId,
            @Valid @RequestBody ProgressUpdateRequest req) {
        ApplicationProgress updated = userService.updateProgress(user.getId(), schemeId, req.getStatus(), req.getNotes());
        return ResponseEntity.ok(ApiResponse.success(updated));
    }

    @PostMapping("/me/progress/merge")
    public ResponseEntity<ApiResponse<Map<String, Object>>> mergeProgress(
            @AuthenticationPrincipal User user,
            @RequestBody Map<String, List<Map<String, String>>> body) {
        List<Map<String, String>> progressList = body.get("progressList");
        userService.mergeProgress(user.getId(), progressList);
        List<ApplicationProgress> updatedList = userService.getProgress(user.getId());
        return ResponseEntity.ok(ApiResponse.success(Map.of("mergedCount", updatedList.size(), "progress", updatedList)));
    }

    // Eligibility Submissions
    @PostMapping("/me/eligibility")
    public ResponseEntity<ApiResponse<EligibilitySubmission>> submitEligibility(
            @AuthenticationPrincipal User user,
            @RequestBody EligibilitySubmitRequest req) throws JsonProcessingException {
        String answersJson = objectMapper.writeValueAsString(req.getAnswers());
        String matchedJson = objectMapper.writeValueAsString(req.getMatchedSchemeIds());
        EligibilitySubmission sub = userService.recordEligibility(user.getId(), answersJson, matchedJson);
        return ResponseEntity.ok(ApiResponse.success(sub));
    }

    @GetMapping("/me/eligibility")
    public ResponseEntity<ApiResponse<List<EligibilitySubmission>>> getEligibilityHistory(@AuthenticationPrincipal User user) {
        List<EligibilitySubmission> history = userService.getEligibilityHistory(user.getId());
        return ResponseEntity.ok(ApiResponse.success(history));
    }

    // Recently Viewed
    @PostMapping("/me/recently-viewed/{schemeId}")
    public ResponseEntity<ApiResponse<Map<String, String>>> recordRecentlyViewed(
            @AuthenticationPrincipal User user,
            @PathVariable String schemeId) {
        userService.recordRecentlyViewed(user.getId(), schemeId);
        return ResponseEntity.ok(ApiResponse.success(Map.of("status", "RECORDED", "schemeId", schemeId)));
    }

    @GetMapping("/me/recently-viewed")
    public ResponseEntity<ApiResponse<List<Scheme>>> getRecentlyViewed(@AuthenticationPrincipal User user) {
        List<Scheme> list = userService.getRecentlyViewed(user.getId());
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    // Notifications
    @GetMapping("/me/notifications")
    public ResponseEntity<ApiResponse<List<Notification>>> getNotifications(@AuthenticationPrincipal User user) {
        List<Notification> list = userService.getNotifications(user.getId());
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @PutMapping("/me/notifications/{id}/read")
    public ResponseEntity<ApiResponse<Map<String, String>>> markNotificationRead(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {
        userService.markNotificationRead(user.getId(), id);
        return ResponseEntity.ok(ApiResponse.success(Map.of("status", "READ", "notificationId", String.valueOf(id))));
    }
}
