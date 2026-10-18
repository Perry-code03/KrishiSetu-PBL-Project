package com.krishisetu.service;

import com.krishisetu.config.JwtTokenProvider;
import com.krishisetu.dto.*;
import com.krishisetu.model.*;
import com.krishisetu.repository.*;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final UserProfileRepository userProfileRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final AuthAuditLogRepository auditLogRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(
            UserRepository userRepository,
            UserProfileRepository userProfileRepository,
            PasswordResetTokenRepository tokenRepository,
            AuthAuditLogRepository auditLogRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.userProfileRepository = userProfileRepository;
        this.tokenRepository = tokenRepository;
        this.auditLogRepository = auditLogRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }

    @Transactional
    public AuthResponse register(RegisterRequest req, String ip, String userAgent) {
        String login = req.getLogin().trim();
        boolean isEmail = login.contains("@");

        String email = isEmail ? login.toLowerCase() : null;
        String mobile = !isEmail ? login.replaceAll("[^0-9]", "") : null;

        if (email != null && userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("An account with this email already exists.");
        }
        if (mobile != null) {
            if (mobile.length() != 10 || !mobile.matches("^[6-9]\\d{9}$")) {
                throw new IllegalArgumentException("Please enter a valid 10-digit Indian mobile number starting with 6-9.");
            }
            if (userRepository.existsByMobile(mobile)) {
                throw new IllegalArgumentException("An account with this mobile number already exists.");
            }
        }

        User user = new User();
        user.setFullName(req.getFullName().trim());
        user.setEmail(email);
        user.setMobile(mobile);
        user.setPasswordHash(passwordEncoder.encode(req.getPassword()));
        user.setRole(User.Role.FARMER);
        user.setPreferredLanguage(req.getPreferredLanguage() != null ? req.getPreferredLanguage() : "en");
        user.setActive(true);
        user.setEmailVerified(false);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        user.setLastLoginAt(LocalDateTime.now());

        user = userRepository.save(user);

        // Optional profile
        UserProfile profile = new UserProfile();
        profile.setUser(user);
        profile.setState(req.getState());
        profile.setDistrict(req.getDistrict());
        if (req.getLandSizeAcres() != null) {
            profile.setLandSizeAcres(BigDecimal.valueOf(req.getLandSizeAcres()));
        }
        profile.setFarmerCategory(req.getFarmerCategory() != null ? req.getFarmerCategory() : "Small Farmer");
        profile.setPrimaryCrops(req.getPrimaryCrops());
        String initial = req.getFullName().length() > 0 ? req.getFullName().substring(0, 1).toUpperCase() : "K";
        profile.setAvatarUrl(initial);

        userProfileRepository.save(profile);
        user.setProfile(profile);

        auditLogRepository.save(new AuthAuditLog(user.getId(), AuthAuditLog.Event.REGISTER, ip, userAgent));

        String token = tokenProvider.generateToken(user);
        return new AuthResponse(token, UserDto.fromEntity(user));
    }

    @Transactional
    public AuthResponse login(LoginRequest req, String ip, String userAgent) {
        String login = req.getLogin().trim();

        // Rate limiting check: 5 failed attempts in last 15 minutes
        LocalDateTime since = LocalDateTime.now().minusMinutes(15);
        long failedAttempts = auditLogRepository.countRecentFailedAttempts(AuthAuditLog.Event.LOGIN_FAIL, ip, since);
        if (failedAttempts >= 5) {
            throw new IllegalArgumentException("Too many failed login attempts. Please wait 15 minutes before trying again.");
        }

        Optional<User> userOpt;
        if (login.contains("@")) {
            userOpt = userRepository.findByEmail(login.toLowerCase());
        } else {
            String digits = login.replaceAll("[^0-9]", "");
            userOpt = userRepository.findByMobile(digits);
        }

        if (userOpt.isEmpty()) {
            auditLogRepository.save(new AuthAuditLog(null, AuthAuditLog.Event.LOGIN_FAIL, ip, userAgent));
            throw new BadCredentialsException("Invalid credentials.");
        }

        User user = userOpt.get();

        if (!user.isActive()) {
            throw new IllegalArgumentException("This account is currently deactivated. Please contact support.");
        }

        if (!passwordEncoder.matches(req.getPassword(), user.getPasswordHash())) {
            auditLogRepository.save(new AuthAuditLog(user.getId(), AuthAuditLog.Event.LOGIN_FAIL, ip, userAgent));
            throw new BadCredentialsException("Invalid credentials.");
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        auditLogRepository.save(new AuthAuditLog(user.getId(), AuthAuditLog.Event.LOGIN_OK, ip, userAgent));

        String token = tokenProvider.generateToken(user);
        return new AuthResponse(token, UserDto.fromEntity(user));
    }

    public void logout(Long userId, String ip, String userAgent) {
        auditLogRepository.save(new AuthAuditLog(userId, AuthAuditLog.Event.LOGOUT, ip, userAgent));
    }

    @Transactional
    public String forgotPassword(ForgotPasswordRequest req, String ip) {
        String login = req.getLogin().trim();
        Optional<User> userOpt = login.contains("@") ?
                userRepository.findByEmail(login.toLowerCase()) :
                userRepository.findByMobile(login.replaceAll("[^0-9]", ""));

        if (userOpt.isEmpty()) {
            // Return ok message without enumerating accounts
            return "If an account with that contact exists, password reset instructions have been logged.";
        }

        User user = userOpt.get();
        String token = UUID.randomUUID().toString().replace("-", "");
        PasswordResetToken resetToken = new PasswordResetToken(user.getId(), token, LocalDateTime.now().plusHours(2));
        tokenRepository.save(resetToken);

        System.out.println("=================================================================");
        System.out.println("[DEV PASSWORD RESET] User: " + user.getFullName() + " (" + login + ")");
        System.out.println("[DEV PASSWORD RESET] Reset Token: " + token);
        System.out.println("[DEV PASSWORD RESET] Link: http://localhost:8080/reset-password.html?token=" + token);
        System.out.println("=================================================================");

        return "Password reset instructions generated. In dev mode, check the server log for the reset token: " + token;
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest req, String ip) {
        PasswordResetToken resetToken = tokenRepository.findByTokenHashAndUsedAtIsNull(req.getToken().trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid or expired password reset token."));

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("This password reset token has expired.");
        }

        User user = userRepository.findById(resetToken.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        user.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        resetToken.setUsedAt(LocalDateTime.now());
        tokenRepository.save(resetToken);

        auditLogRepository.save(new AuthAuditLog(user.getId(), AuthAuditLog.Event.PASSWORD_RESET, ip, "Password reset"));
    }

    @Transactional
    public void changePassword(Long userId, ChangePasswordRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        if (!passwordEncoder.matches(req.getCurrentPassword(), user.getPasswordHash())) {
            throw new BadCredentialsException("Current password does not match.");
        }

        user.setPasswordHash(passwordEncoder.encode(req.getNewPassword()));
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);
    }

    @Transactional
    public UserDto updateProfile(Long userId, UserDto.ProfileDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        UserProfile profile = user.getProfile();
        if (profile == null) {
            profile = new UserProfile();
            profile.setUser(user);
        }

        if (dto.getState() != null) profile.setState(dto.getState());
        if (dto.getDistrict() != null) profile.setDistrict(dto.getDistrict());
        if (dto.getLandSizeAcres() != null) profile.setLandSizeAcres(BigDecimal.valueOf(dto.getLandSizeAcres()));
        if (dto.getFarmerCategory() != null) profile.setFarmerCategory(dto.getFarmerCategory());
        if (dto.getPrimaryCrops() != null) profile.setPrimaryCrops(dto.getPrimaryCrops());
        if (dto.getAnnualIncomeBand() != null) profile.setAnnualIncomeBand(dto.getAnnualIncomeBand());
        if (dto.getGender() != null) profile.setGender(dto.getGender());
        if (dto.getSocialCategory() != null) profile.setSocialCategory(dto.getSocialCategory());
        profile.setFpoMember(dto.isFpoMember());

        userProfileRepository.save(profile);
        user.setProfile(profile);
        userRepository.save(user);

        return UserDto.fromEntity(user);
    }

    @Transactional
    public void deleteAccount(Long userId, String password) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found."));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new BadCredentialsException("Password verification failed.");
        }

        userRepository.delete(user);
    }
}
