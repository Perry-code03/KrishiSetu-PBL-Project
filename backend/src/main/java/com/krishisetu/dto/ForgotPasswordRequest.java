package com.krishisetu.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ForgotPasswordRequest {
    @NotBlank(message = "Email or mobile is required")
    private String login;

    public ForgotPasswordRequest() {}
    public String getLogin() { return login; }
    public void setLogin(String login) { this.login = login; }
}
