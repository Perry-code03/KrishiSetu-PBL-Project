package com.krishisetu.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "user_profiles")
public class UserProfile {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @Column(length = 64)
    private String state;

    @Column(length = 64)
    private String district;

    @Column(name = "land_size_acres", precision = 6, scale = 2)
    private BigDecimal landSizeAcres;

    @Column(name = "farmer_category", length = 32)
    private String farmerCategory;

    @Column(name = "primary_crops", length = 255)
    private String primaryCrops;

    @Column(name = "annual_income_band", length = 64)
    private String annualIncomeBand;

    @Column(length = 16)
    private String gender;

    @Column(name = "social_category", length = 32)
    private String socialCategory;

    @Column(name = "is_fpo_member")
    private boolean fpoMember;

    @Column(name = "avatar_url", length = 255)
    private String avatarUrl;

    public UserProfile() {}

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public BigDecimal getLandSizeAcres() { return landSizeAcres; }
    public void setLandSizeAcres(BigDecimal landSizeAcres) { this.landSizeAcres = landSizeAcres; }

    public String getFarmerCategory() { return farmerCategory; }
    public void setFarmerCategory(String farmerCategory) { this.farmerCategory = farmerCategory; }

    public String getPrimaryCrops() { return primaryCrops; }
    public void setPrimaryCrops(String primaryCrops) { this.primaryCrops = primaryCrops; }

    public String getAnnualIncomeBand() { return annualIncomeBand; }
    public void setAnnualIncomeBand(String annualIncomeBand) { this.annualIncomeBand = annualIncomeBand; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getSocialCategory() { return socialCategory; }
    public void setSocialCategory(String socialCategory) { this.socialCategory = socialCategory; }

    public boolean isFpoMember() { return fpoMember; }
    public void setFpoMember(boolean fpoMember) { this.fpoMember = fpoMember; }

    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
}
