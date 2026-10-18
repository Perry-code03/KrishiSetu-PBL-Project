package com.krishisetu.repository;

import com.krishisetu.model.SavedScheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SavedSchemeRepository extends JpaRepository<SavedScheme, SavedScheme.SavedSchemeId> {
    List<SavedScheme> findById_UserId(Long userId);
    boolean existsById_UserIdAndId_SchemeId(Long userId, String schemeId);
    void deleteById_UserIdAndId_SchemeId(Long userId, String schemeId);
}
