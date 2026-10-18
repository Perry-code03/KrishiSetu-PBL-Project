package com.krishisetu.dto;

import com.krishisetu.model.User;
import com.krishisetu.model.UserProfile;

public class UserDto {
    private Long id;
    private String fullName;
    private String email;
    private String mobile;
    private String role;
    private String preferredLanguage;
    private ProfileDto profile;

    public UserDto() {}

    public static UserDto fromEntity(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setMobile(user.getMobile());
        dto.setRole(user.getRole().name());
        dto.setPreferredLanguage(user.getPreferredLanguage());

        if (user.getProfile() != null) {
            UserProfile p = user.getProfile();
            ProfileDto pd = new ProfileDto();
            pd.setState(p.getState());
            pd.setDistrict(p.getDistrict());
            pd.setLandSizeAcres(p.getLandSizeAcres() != null ? p.getLandSizeAcres().doubleValue() : null);
            pd.setFarmerCategory(p.getFarmerCategory());
            pd.setPrimaryCrops(p.getPrimaryCrops());
            pd.setAnnualIncomeBand(p.getAnnualIncomeBand());
            pd.setGender(p.getGender());
            pd.setSocialCategory(p.getSocialCategory());
            pd.setFpoMember(p.isFpoMember());
            pd.setAvatarUrl(p.getAvatarUrl());
            dto.setProfile(pd);
        }
        return dto;
    }

    public static class ProfileDto {
        private String state;
        private String district;
        private Double landSizeAcres;
        private String farmerCategory;
        private String primaryCrops;
        private String annualIncomeBand;
        private String gender;
        private String socialCategory;
        private boolean fpoMember;
        private String avatarUrl;

        public ProfileDto() {}

        public String getState() { return state; }
        public void setState(String state) { this.state = state; }

        public String getDistrict() { return district; }
        public void setDistrict(String district) { this.district = district; }

        public Double getLandSizeAcres() { return landSizeAcres; }
        public void setLandSizeAcres(Double landSizeAcres) { this.landSizeAcres = landSizeAcres; }

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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getPreferredLanguage() { return preferredLanguage; }
    public void setPreferredLanguage(String preferredLanguage) { this.preferredLanguage = preferredLanguage; }

    public ProfileDto getProfile() { return profile; }
    public void setProfile(ProfileDto profile) { this.profile = profile; }
}
