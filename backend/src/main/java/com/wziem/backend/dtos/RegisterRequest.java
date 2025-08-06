package com.wziem.backend.dtos;

import com.wziem.backend.entities.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @Email(message = "Must be a valid email")
    @NotBlank(message = "Email must not be blank")
    private String email;

    @NotBlank(message = "Password must not be blank")
    @Size(min = 8, max = 25, message = "Password must be between 8 and 25 characters")
    private String password;

    @NotBlank(message = "Name must not be blank")
    private String name;

    @NotBlank(message = "Role must not be blank")
    private Role role;
}
