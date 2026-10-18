package com.krishisetu.service;

import com.krishisetu.model.Scheme;
import com.krishisetu.model.SchemeCategory;
import com.krishisetu.repository.SchemeCategoryRepository;
import com.krishisetu.repository.SchemeRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class SchemeService {

    private final SchemeRepository schemeRepository;
    private final SchemeCategoryRepository categoryRepository;

    public SchemeService(SchemeRepository schemeRepository, SchemeCategoryRepository categoryRepository) {
        this.schemeRepository = schemeRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Scheme> getAllSchemes(String category, String q, String sortBy) {
        List<Scheme> list;

        if (q != null && !q.trim().isEmpty()) {
            list = schemeRepository.searchSchemes(q.trim());
        } else if (category != null && !category.equalsIgnoreCase("all") && !category.trim().isEmpty()) {
            list = schemeRepository.findByCategory_SlugAndActiveTrue(category.trim());
        } else {
            list = schemeRepository.findByActiveTrue();
        }

        if (category != null && !category.equalsIgnoreCase("all") && q != null && !q.trim().isEmpty()) {
            list = list.stream()
                    .filter(s -> s.getCategory().getSlug().equalsIgnoreCase(category.trim()))
                    .toList();
        }

        if ("subsidy".equalsIgnoreCase(sortBy)) {
            list = list.stream()
                    .sorted(Comparator.comparing(Scheme::getSubsidyHighlight).reversed())
                    .toList();
        } else if ("closing".equalsIgnoreCase(sortBy)) {
            list = list.stream()
                    .sorted(Comparator.comparing(s -> s.getDeadline() != null ? s.getDeadline() : "ZZZ"))
                    .toList();
        }

        return list;
    }

    public Optional<Scheme> getSchemeBySlug(String slug) {
        return schemeRepository.findBySlug(slug);
    }

    public List<SchemeCategory> getAllCategories() {
        return categoryRepository.findAll().stream()
                .sorted(Comparator.comparing(SchemeCategory::getDisplayOrder))
                .toList();
    }

    public List<Scheme> searchSchemes(String query) {
        if (query == null || query.trim().isEmpty()) {
            return schemeRepository.findByActiveTrue();
        }
        return schemeRepository.searchSchemes(query.trim());
    }

    public Scheme saveScheme(Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    public void deleteScheme(String id) {
        schemeRepository.deleteById(id);
    }
}
