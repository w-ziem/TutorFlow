package com.wziem.backend.controllers;

import com.wziem.backend.config.JwtConfig;
import com.wziem.backend.dtos.JwtDto;
import com.wziem.backend.dtos.LoginRequest;
import com.wziem.backend.dtos.RegisterRequest;
import com.wziem.backend.dtos.UserDto;
import com.wziem.backend.repositories.UserRepository;
import com.wziem.backend.services.AuthService;
import com.wziem.backend.services.JwtService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        JwtDto token = authService.loginUser(request, response);
        return ResponseEntity.ok(token);
    }


    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@Valid @RequestBody RegisterRequest request) {
        UserDto dto = authService.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

}
