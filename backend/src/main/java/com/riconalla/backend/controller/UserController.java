package com.riconalla.backend.controller;

import com.riconalla.backend.model.User;
import com.riconalla.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final AuthService authService;

    public UserController(AuthService authService) {
        this.authService = authService;
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        // Get currently authenticated user from Spring Security context
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            // Fetch full user details from database
            User user = authService.findByEmail(email);
            if (user != null) {
                // Return limited user info (don't expose password hash)
                return ResponseEntity.ok(new UserProfileResponse(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getRole(),
                        user.isActive()
                ));
            }
        }

        return ResponseEntity.status(401).body("User not found");
    }
}

// Add this inner class or create a separate DTO file
class UserProfileResponse {
    private Long id;
    private String username;
    private String email;
    private String role;
    private boolean active;

    public UserProfileResponse(Long id, String username, String email, String role, boolean active) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.role = role;
        this.active = active;
    }


    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public boolean isActive() { return active; }
}