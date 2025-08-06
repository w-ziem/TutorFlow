package com.wziem.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @Email(message = "Must be a valid email")
    private String email;

    @NotBlank(message = "Password must not be blank")
    private String password;
}
