package com.krishisetu.repository;

import com.krishisetu.model.AuthAuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuthAuditLogRepository extends JpaRepository<AuthAuditLog, Long> {
    List<AuthAuditLog> findTop50ByOrderByCreatedAtDesc();

    @Query("SELECT COUNT(a) FROM AuthAuditLog a WHERE a.event = :event AND a.ip = :ip AND a.createdAt >= :since")
    long countRecentFailedAttempts(@Param("event") AuthAuditLog.Event event, @Param("ip") String ip, @Param("since") LocalDateTime since);
}
