package com.krishisetu.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "schemes")
public class Scheme {

    @Id
    @Column(length = 64)
    private String id;

    @Column(nullable = false, unique = true, length = 32)
    private String code;

    @Column(nullable = false, unique = true, length = 128)
    private String slug;

    @Column(name = "name_en", nullable = false)
    private String nameEn;

    @Column(name = "name_hi", nullable = false)
    private String nameHi;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private SchemeCategory category;

    @Column(name = "issuing_body", nullable = false)
    private String issuingBody;

    @Column(name = "issuing_body_hi")
    private String issuingBodyHi;

    @Column(name = "summary_en", columnDefinition = "TEXT", nullable = false)
    private String summaryEn;

    @Column(name = "summary_hi", columnDefinition = "TEXT", nullable = false)
    private String summaryHi;

    @Column(columnDefinition = "JSON", nullable = false)
    private String benefits;

    @Column(columnDefinition = "JSON", nullable = false)
    private String eligibility;

    @Column(name = "documents_required", columnDefinition = "JSON", nullable = false)
    private String documentsRequired;

    @Column(columnDefinition = "JSON", nullable = false)
    private String steps;

    @Column(name = "official_url", length = 512, nullable = false)
    private String officialUrl;

    @Column(name = "apply_url", length = 512)
    private String applyUrl;

    @Column(columnDefinition = "JSON")
    private String tags;

    @Column(columnDefinition = "JSON")
    private String keywords;

    @Column(name = "subsidy_highlight", length = 128, nullable = false)
    private String subsidyHighlight;

    @Column(length = 64)
    private String badge;

    @Column(name = "min_land_hectares", precision = 5, scale = 2)
    private BigDecimal minLandHectares = BigDecimal.ZERO;

    @Column(name = "max_land_hectares", precision = 5, scale = 2)
    private BigDecimal maxLandHectares = new BigDecimal("999.00");

    @Column(name = "target_beneficiary")
    private String targetBeneficiary;

    @Column(length = 64)
    private String deadline;

    @Column(name = "last_verified_date", length = 64, nullable = false)
    private String lastVerifiedDate;

    @Column(name = "source_url", length = 512, nullable = false)
    private String sourceUrl;

    @Column(name = "is_active", nullable = false)
    private boolean active = true;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "scheme", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<SchemeDocument> officialDocuments = new ArrayList<>();

    public Scheme() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }

    public String getNameEn() { return nameEn; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }

    public String getNameHi() { return nameHi; }
    public void setNameHi(String nameHi) { this.nameHi = nameHi; }

    public SchemeCategory getCategory() { return category; }
    public void setCategory(SchemeCategory category) { this.category = category; }

    public String getIssuingBody() { return issuingBody; }
    public void setIssuingBody(String issuingBody) { this.issuingBody = issuingBody; }

    public String getIssuingBodyHi() { return issuingBodyHi; }
    public void setIssuingBodyHi(String issuingBodyHi) { this.issuingBodyHi = issuingBodyHi; }

    public String getSummaryEn() { return summaryEn; }
    public void setSummaryEn(String summaryEn) { this.summaryEn = summaryEn; }

    public String getSummaryHi() { return summaryHi; }
    public void setSummaryHi(String summaryHi) { this.summaryHi = summaryHi; }

    public String getBenefits() { return benefits; }
    public void setBenefits(String benefits) { this.benefits = benefits; }

    public String getEligibility() { return eligibility; }
    public void setEligibility(String eligibility) { this.eligibility = eligibility; }

    public String getDocumentsRequired() { return documentsRequired; }
    public void setDocumentsRequired(String documentsRequired) { this.documentsRequired = documentsRequired; }

    public String getSteps() { return steps; }
    public void setSteps(String steps) { this.steps = steps; }

    public String getOfficialUrl() { return officialUrl; }
    public void setOfficialUrl(String officialUrl) { this.officialUrl = officialUrl; }

    public String getApplyUrl() { return applyUrl; }
    public void setApplyUrl(String applyUrl) { this.applyUrl = applyUrl; }

    public String getTags() { return tags; }
    public void setTags(String tags) { this.tags = tags; }

    public String getKeywords() { return keywords; }
    public void setKeywords(String keywords) { this.keywords = keywords; }

    public String getSubsidyHighlight() { return subsidyHighlight; }
    public void setSubsidyHighlight(String subsidyHighlight) { this.subsidyHighlight = subsidyHighlight; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public BigDecimal getMinLandHectares() { return minLandHectares; }
    public void setMinLandHectares(BigDecimal minLandHectares) { this.minLandHectares = minLandHectares; }

    public BigDecimal getMaxLandHectares() { return maxLandHectares; }
    public void setMaxLandHectares(BigDecimal maxLandHectares) { this.maxLandHectares = maxLandHectares; }

    public String getTargetBeneficiary() { return targetBeneficiary; }
    public void setTargetBeneficiary(String targetBeneficiary) { this.targetBeneficiary = targetBeneficiary; }

    public String getDeadline() { return deadline; }
    public void setDeadline(String deadline) { this.deadline = deadline; }

    public String getLastVerifiedDate() { return lastVerifiedDate; }
    public void setLastVerifiedDate(String lastVerifiedDate) { this.lastVerifiedDate = lastVerifiedDate; }

    public String getSourceUrl() { return sourceUrl; }
    public void setSourceUrl(String sourceUrl) { this.sourceUrl = sourceUrl; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public List<SchemeDocument> getOfficialDocuments() { return officialDocuments; }
    public void setOfficialDocuments(List<SchemeDocument> officialDocuments) { this.officialDocuments = officialDocuments; }
}
