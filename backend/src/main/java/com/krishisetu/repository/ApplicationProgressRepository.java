package com.krishisetu.repository;

import com.krishisetu.model.ApplicationProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationProgressRepository extends JpaRepository<ApplicationProgress, Long> {
    List<ApplicationProgress> findByUserId(Long userId);
    Optional<ApplicationProgress> findByUserIdAndSchemeId(Long userId, String schemeId);
}
