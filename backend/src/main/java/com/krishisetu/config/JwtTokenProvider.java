package com.krishisetu.config;

import com.krishisetu.model.User;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final long expirationMillis;

    public JwtTokenProvider(
            @Value("${krishisetu.jwt.secret:dGhpcy1pcy1hLXZlcnktc2VjdXJlLWR1bW15LWp3dC1zZWNyZXQta2V5LWZvci1rcmlzaGlzZXR1LWFwcGxpY2F0aW9uLTIwMjY=}") String secret,
            @Value("${krishisetu.jwt.expiration-hours:24}") long expirationHours) {

        SecretKey key;
        try {
            byte[] decoded = Decoders.BASE64.decode(secret.trim());
            if (decoded.length < 32) {
                // If base64 key is too short, pad with sha256 or use direct bytes
                key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            } else {
                key = Keys.hmacShaKeyFor(decoded);
            }
        } catch (Exception e) {
            byte[] keyBytes = secret.getBytes(StandardCharsets.UTF_8);
            if (keyBytes.length < 32) {
                key = Keys.hmacShaKeyFor("krishisetu-secure-fallback-jwt-signing-key-minimum-256-bits-long!".getBytes(StandardCharsets.UTF_8));
            } else {
                key = Keys.hmacShaKeyFor(keyBytes);
            }
        }
        this.secretKey = key;
        this.expirationMillis = expirationHours * 3600 * 1000;
    }

    public String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationMillis);

        String subject = String.valueOf(user.getId());
        String login = user.getEmail() != null ? user.getEmail() : user.getMobile();

        return Jwts.builder()
                .subject(subject)
                .claim("userId", user.getId())
                .claim("login", login)
                .claim("name", user.getFullName())
                .claim("role", user.getRole().name())
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public Long getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        return Long.parseLong(claims.getSubject());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
