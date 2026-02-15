package com.riconalla.backend.controller;

import com.riconalla.backend.dto.LoginRequest;
import com.riconalla.backend.dto.AuthResponse;
import com.riconalla.backend.model.User;
import com.riconalla.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.HashMap;
import java.util.Map;

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
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("userId", user.getId());
                response.put("email", user.getEmail());
                response.put("username", user.getUsername());  // Make sure this is included!
                response.put("success", true);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .body(new AuthResponse("Invalid email or password"));
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse("Login failed: " + e.getMessage()));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // With basic auth, logout is handled client-side
        // But we can add server-side token blacklisting later
        return ResponseEntity.ok("Logged out successfully");
    }
}