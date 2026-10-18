package com.krishisetu.service;

import com.krishisetu.model.*;
import com.krishisetu.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final SavedSchemeRepository savedSchemeRepository;
    private final ApplicationProgressRepository progressRepository;
    private final EligibilitySubmissionRepository eligibilityRepository;
    private final RecentlyViewedRepository recentlyViewedRepository;
    private final NotificationRepository notificationRepository;
    private final SchemeRepository schemeRepository;

    public UserService(
            SavedSchemeRepository savedSchemeRepository,
            ApplicationProgressRepository progressRepository,
            EligibilitySubmissionRepository eligibilityRepository,
            RecentlyViewedRepository recentlyViewedRepository,
            NotificationRepository notificationRepository,
            SchemeRepository schemeRepository) {
        this.savedSchemeRepository = savedSchemeRepository;
        this.progressRepository = progressRepository;
        this.eligibilityRepository = eligibilityRepository;
        this.recentlyViewedRepository = recentlyViewedRepository;
        this.notificationRepository = notificationRepository;
        this.schemeRepository = schemeRepository;
    }

    public List<Scheme> getSavedSchemes(Long userId) {
        List<SavedScheme> bookmarks = savedSchemeRepository.findById_UserId(userId);
        List<String> schemeIds = bookmarks.stream().map(b -> b.getId().getSchemeId()).toList();
        return schemeRepository.findAllById(schemeIds);
    }

    @Transactional
    public void saveScheme(Long userId, String schemeId) {
        if (!savedSchemeRepository.existsById_UserIdAndId_SchemeId(userId, schemeId)) {
            savedSchemeRepository.save(new SavedScheme(userId, schemeId));
        }
    }

    @Transactional
    public void removeSavedScheme(Long userId, String schemeId) {
        savedSchemeRepository.deleteById_UserIdAndId_SchemeId(userId, schemeId);
    }

    @Transactional
    public void mergeSavedSchemes(Long userId, List<String> schemeIds) {
        if (schemeIds == null) return;
        for (String id : schemeIds) {
            if (id != null && !id.trim().isEmpty()) {
                saveScheme(userId, id.trim());
            }
        }
    }

    public List<ApplicationProgress> getProgress(Long userId) {
        return progressRepository.findByUserId(userId);
    }

    @Transactional
    public ApplicationProgress updateProgress(Long userId, String schemeId, ApplicationProgress.Status status, String notes) {
        Optional<ApplicationProgress> existing = progressRepository.findByUserIdAndSchemeId(userId, schemeId);
        ApplicationProgress prog;
        if (existing.isPresent()) {
            prog = existing.get();
            prog.setStatus(status);
            if (notes != null) prog.setNotes(notes);
            prog.setUpdatedAt(LocalDateTime.now());
        } else {
            prog = new ApplicationProgress(userId, schemeId, status, notes);
        }
        return progressRepository.save(prog);
    }

    @Transactional
    public void mergeProgress(Long userId, List<Map<String, String>> progressList) {
        if (progressList == null) return;
        for (Map<String, String> item : progressList) {
            String schemeId = item.get("schemeId");
            String statusStr = item.get("status");
            String notes = item.get("notes");
            if (schemeId != null && statusStr != null) {
                try {
                    ApplicationProgress.Status st = ApplicationProgress.Status.valueOf(statusStr.toUpperCase());
                    updateProgress(userId, schemeId, st, notes);
                } catch (IllegalArgumentException ignored) {}
            }
        }
    }

    @Transactional
    public EligibilitySubmission recordEligibility(Long userId, String answersJson, String matchedSchemeIdsJson) {
        EligibilitySubmission sub = new EligibilitySubmission();
        sub.setUserId(userId);
        sub.setAnswers(answersJson);
        sub.setMatchedSchemeIds(matchedSchemeIdsJson);
        return eligibilityRepository.save(sub);
    }

    public List<EligibilitySubmission> getEligibilityHistory(Long userId) {
        return eligibilityRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Transactional
    public void recordRecentlyViewed(Long userId, String schemeId) {
        Optional<RecentlyViewed> existing = recentlyViewedRepository.findByUserIdAndSchemeId(userId, schemeId);
        if (existing.isPresent()) {
            RecentlyViewed rv = existing.get();
            rv.setViewedAt(LocalDateTime.now());
            recentlyViewedRepository.save(rv);
        } else {
            recentlyViewedRepository.save(new RecentlyViewed(userId, schemeId));
        }
    }

    public List<Scheme> getRecentlyViewed(Long userId) {
        List<RecentlyViewed> list = recentlyViewedRepository.findByUserIdOrderByViewedAtDesc(userId);
        List<String> ids = list.stream().map(RecentlyViewed::getSchemeId).limit(10).toList();
        return schemeRepository.findAllById(ids);
    }

    public List<Notification> getNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    @Transactional
    public void markNotificationRead(Long userId, Long notifId) {
        notificationRepository.findById(notifId).ifPresent(n -> {
            if (n.getUserId().equals(userId)) {
                n.setRead(true);
                notificationRepository.save(n);
            }
        });
    }
}
