package com.riconalla.backend.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthResponse {
    private String message;
    private Long userId;
    private String email;
    private String username;
    private boolean success;

    public AuthResponse() {}

    public AuthResponse(String message) {
        this.message = message;
        this.success = false;
    }

    public AuthResponse(String message, Long userId, String email) {
        this.message = message;
        this.userId = userId;
        this.email = email;
        this.success = true;
    }

    // Getters and Setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}