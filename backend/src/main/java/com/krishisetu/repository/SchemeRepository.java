package com.krishisetu.repository;

import com.krishisetu.model.Scheme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SchemeRepository extends JpaRepository<Scheme, String> {
    Optional<Scheme> findBySlug(String slug);
    List<Scheme> findByActiveTrue();
    List<Scheme> findByCategory_SlugAndActiveTrue(String categorySlug);

    @Query("SELECT s FROM Scheme s WHERE s.active = true AND (" +
            "LOWER(s.nameEn) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(s.nameHi) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(s.summaryEn) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(s.keywords) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
            "LOWER(s.tags) LIKE LOWER(CONCAT('%', :q, '%')))")
    List<Scheme> searchSchemes(@Param("q") String q);
}
