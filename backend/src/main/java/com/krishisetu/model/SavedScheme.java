package com.krishisetu.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "saved_schemes")
public class SavedScheme {

    @EmbeddedId
    private SavedSchemeId id;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    public SavedScheme() {}

    public SavedScheme(Long userId, String schemeId) {
        this.id = new SavedSchemeId(userId, schemeId);
        this.createdAt = LocalDateTime.now();
    }

    public SavedSchemeId getId() { return id; }
    public void setId(SavedSchemeId id) { this.id = id; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    @Embeddable
    public static class SavedSchemeId implements Serializable {
        @Column(name = "user_id")
        private Long userId;

        @Column(name = "scheme_id", length = 64)
        private String schemeId;

        public SavedSchemeId() {}
        public SavedSchemeId(Long userId, String schemeId) {
            this.userId = userId;
            this.schemeId = schemeId;
        }

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }

        public String getSchemeId() { return schemeId; }
        public void setSchemeId(String schemeId) { this.schemeId = schemeId; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof SavedSchemeId that)) return false;
            return Objects.equals(userId, that.userId) && Objects.equals(schemeId, that.schemeId);
        }

        @Override
        public int hashCode() {
            return Objects.hash(userId, schemeId);
        }
    }
}
