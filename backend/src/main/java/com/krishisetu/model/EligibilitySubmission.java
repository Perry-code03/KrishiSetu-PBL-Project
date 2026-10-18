package com.krishisetu.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "eligibility_submissions")
public class EligibilitySubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(columnDefinition = "JSON", nullable = false)
    private String answers;

    @Column(name = "matched_scheme_ids", columnDefinition = "JSON", nullable = false)
    private String matchedSchemeIds;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public EligibilitySubmission() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getAnswers() { return answers; }
    public void setAnswers(String answers) { this.answers = answers; }

    public String getMatchedSchemeIds() { return matchedSchemeIds; }
    public void setMatchedSchemeIds(String matchedSchemeIds) { this.matchedSchemeIds = matchedSchemeIds; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
