package com.krishisetu.controller;

import com.krishisetu.dto.ApiResponse;
import com.krishisetu.model.Scheme;
import com.krishisetu.model.SchemeCategory;
import com.krishisetu.service.SchemeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SchemeController {

    private final SchemeService schemeService;

    public SchemeController(SchemeService schemeService) {
        this.schemeService = schemeService;
    }

    @GetMapping("/schemes")
    public ResponseEntity<ApiResponse<List<Scheme>>> getSchemes(
            @RequestParam(required = false, defaultValue = "all") String category,
            @RequestParam(required = false, defaultValue = "") String q,
            @RequestParam(required = false, defaultValue = "relevant") String sortBy) {

        List<Scheme> list = schemeService.getAllSchemes(category, q, sortBy);
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/schemes/{slug}")
    public ResponseEntity<ApiResponse<Scheme>> getSchemeDetail(@PathVariable String slug) {
        return schemeService.getSchemeBySlug(slug)
                .map(s -> ResponseEntity.ok(ApiResponse.success(s)))
                .orElseGet(() -> ResponseEntity.status(404).body(ApiResponse.error("NOT_FOUND", "Scheme not found.")));
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<SchemeCategory>>> getCategories() {
        List<SchemeCategory> categories = schemeService.getAllCategories();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }

    @GetMapping("/schemes/search")
    public ResponseEntity<ApiResponse<List<Scheme>>> searchSchemes(@RequestParam(required = false, defaultValue = "") String q) {
        List<Scheme> results = schemeService.searchSchemes(q);
        return ResponseEntity.ok(ApiResponse.success(results));
    }
}
