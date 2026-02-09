package com.riconalla.backend.controller;

import com.riconalla.backend.model.User;
import com.riconalla.backend.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public User login(
            @RequestParam String email,
            @RequestParam String password
    ) {
        return authService.login(email, password);
    }
}
