package com.krishisetu.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "scheme_documents")
public class SchemeDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scheme_id", nullable = false)
    @JsonIgnore
    private Scheme scheme;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 512)
    private String url;

    @Column(name = "doc_type", nullable = false, length = 16)
    private String docType = "pdf";

    @Column(name = "source_name", nullable = false)
    private String sourceName;

    @Column(length = 8)
    private String year = "2024";

    @Column(name = "verified_at")
    private LocalDateTime verifiedAt = LocalDateTime.now();

    public SchemeDocument() {}

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Scheme getScheme() { return scheme; }
    public void setScheme(Scheme scheme) { this.scheme = scheme; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getDocType() { return docType; }
    public void setDocType(String docType) { this.docType = docType; }

    public String getSourceName() { return sourceName; }
    public void setSourceName(String sourceName) { this.sourceName = sourceName; }

    public String getYear() { return year; }
    public void setYear(String year) { this.year = year; }

    public LocalDateTime getVerifiedAt() { return verifiedAt; }
    public void setVerifiedAt(LocalDateTime verifiedAt) { this.verifiedAt = verifiedAt; }
}
