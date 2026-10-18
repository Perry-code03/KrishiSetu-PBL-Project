package com.krishisetu;

import com.krishisetu.dto.AuthResponse;
import com.krishisetu.dto.LoginRequest;
import com.krishisetu.dto.RegisterRequest;
import com.krishisetu.service.AuthService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
public class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Test
    @DisplayName("Should successfully register a new farmer with valid mobile and password")
    public void testRegisterSuccess() {
        RegisterRequest req = new RegisterRequest();
        req.setFullName("Suresh Kumar");
        req.setLogin("9812345678");
        req.setPassword("Suresh@2026");
        req.setState("Madhya Pradesh");
        req.setDistrict("Indore");
        req.setLandSizeAcres(3.5);

        AuthResponse res = authService.register(req, "127.0.0.1", "JUnit-Test");
        assertNotNull(res);
        assertNotNull(res.getToken());
        assertEquals("Suresh Kumar", res.getUser().getFullName());
        assertEquals("9812345678", res.getUser().getMobile());
    }

    @Test
    @DisplayName("Should reject registration with duplicate mobile")
    public void testDuplicateMobile() {
        RegisterRequest req1 = new RegisterRequest();
        req1.setFullName("Test Farmer 1");
        req1.setLogin("9900000001");
        req1.setPassword("Pass@12345");
        authService.register(req1, "127.0.0.1", "JUnit-Test");

        RegisterRequest req2 = new RegisterRequest();
        req2.setFullName("Test Farmer 2");
        req2.setLogin("9900000001");
        req2.setPassword("Pass@12345");

        assertThrows(IllegalArgumentException.class, () -> {
            authService.register(req2, "127.0.0.1", "JUnit-Test");
        });
    }

    @Test
    @DisplayName("Should login successfully with seeded demo farmer")
    public void testLoginSuccess() {
        LoginRequest req = new LoginRequest();
        req.setLogin("farmer@krishisetu.in");
        req.setPassword("Farmer@123");

        AuthResponse res = authService.login(req, "127.0.0.1", "JUnit-Test");
        assertNotNull(res);
        assertNotNull(res.getToken());
        assertEquals("Ramesh Patel", res.getUser().getFullName());
    }

    @Test
    @DisplayName("Should reject login with bad password")
    public void testBadPassword() {
        LoginRequest req = new LoginRequest();
        req.setLogin("farmer@krishisetu.in");
        req.setPassword("WrongPassword123!");

        assertThrows(BadCredentialsException.class, () -> {
            authService.login(req, "127.0.0.1", "JUnit-Test");
        });
    }

    @Test
    @DisplayName("Should enforce rate limiting after repeated failed attempts")
    public void testRateLimiting() {
        LoginRequest req = new LoginRequest();
        req.setLogin("nonexistent@krishisetu.in");
        req.setPassword("DummyPass!");

        String ip = "192.168.1.99";

        // Attempt 5 times
        for (int i = 0; i < 5; i++) {
            try {
                authService.login(req, ip, "RateLimit-Test");
            } catch (Exception ignored) {}
        }

        // 6th attempt should trigger rate limiting lockout
        Exception ex = assertThrows(IllegalArgumentException.class, () -> {
            authService.login(req, ip, "RateLimit-Test");
        });
        assertTrue(ex.getMessage().contains("Too many failed login attempts"));
    }
}
