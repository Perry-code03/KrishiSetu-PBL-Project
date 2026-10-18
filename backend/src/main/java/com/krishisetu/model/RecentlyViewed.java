package com.krishisetu.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "recently_viewed", uniqueConstraints = {
        @UniqueConstraint(name = "uk_user_recent_scheme", columnNames = {"user_id", "scheme_id"})
})
public class RecentlyViewed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "scheme_id", nullable = false, length = 64)
    private String schemeId;

    @Column(name = "viewed_at")
    private LocalDateTime viewedAt = LocalDateTime.now();

    public RecentlyViewed() {}

    public RecentlyViewed(Long userId, String schemeId) {
        this.userId = userId;
        this.schemeId = schemeId;
        this.viewedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getSchemeId() { return schemeId; }
    public void setSchemeId(String schemeId) { this.schemeId = schemeId; }

    public LocalDateTime getViewedAt() { return viewedAt; }
    public void setViewedAt(LocalDateTime viewedAt) { this.viewedAt = viewedAt; }
}
