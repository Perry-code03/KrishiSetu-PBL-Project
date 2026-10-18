package com.krishisetu.repository;

import com.krishisetu.model.SchemeDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SchemeDocumentRepository extends JpaRepository<SchemeDocument, Integer> {
    List<SchemeDocument> findByScheme_Id(String schemeId);
}
