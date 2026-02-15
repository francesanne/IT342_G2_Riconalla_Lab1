package com.riconalla.backend.controller;

import com.riconalla.backend.dto.LoginRequest;
import com.riconalla.backend.dto.AuthResponse;
import com.riconalla.backend.model.User;
import com.riconalla.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = authService.register(user);
            // Don't return the user directly - create a response DTO
            return ResponseEntity.ok(new AuthResponse(
                    "Registration successful",
                    registeredUser.getId(),
                    registeredUser.getEmail()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
            if (user != null) {
                return ResponseEntity.ok(new AuthResponse(
                        "Login successful",
                        user.getId(),
                        user.getEmail()
                ));
            } else {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // With basic auth, logout is handled client-side
        // But we can add server-side token blacklisting later
        return ResponseEntity.ok("Logged out successfully");
    }
}