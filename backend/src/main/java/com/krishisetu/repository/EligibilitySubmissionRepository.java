package com.krishisetu.repository;

import com.krishisetu.model.EligibilitySubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EligibilitySubmissionRepository extends JpaRepository<EligibilitySubmission, Long> {
    List<EligibilitySubmission> findByUserIdOrderByCreatedAtDesc(Long userId);
}
