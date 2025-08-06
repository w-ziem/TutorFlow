package com.wziem.backend.controllers;

import com.wziem.backend.config.JwtConfig;
import com.wziem.backend.dtos.JwtDto;
import com.wziem.backend.dtos.LoginRequest;
import com.wziem.backend.entities.User;
import com.wziem.backend.repositories.UserRepository;
import com.wziem.backend.services.AuthService;
import com.wziem.backend.services.Jwt;
import com.wziem.backend.services.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final JwtConfig jwtConfig;
    private final UserRepository userRepository;
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        JwtDto token = authService.loginUser(request, response);
        return ResponseEntity.ok(token);
    }


}
