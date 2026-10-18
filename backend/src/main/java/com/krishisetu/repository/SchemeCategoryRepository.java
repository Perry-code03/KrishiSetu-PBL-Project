package com.krishisetu.repository;

import com.krishisetu.model.SchemeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SchemeCategoryRepository extends JpaRepository<SchemeCategory, Integer> {
    Optional<SchemeCategory> findBySlug(String slug);
}
