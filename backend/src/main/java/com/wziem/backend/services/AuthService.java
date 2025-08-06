package com.wziem.backend.services;

import com.wziem.backend.config.JwtConfig;
import com.wziem.backend.dtos.JwtDto;
import com.wziem.backend.dtos.LoginRequest;
import com.wziem.backend.entities.User;
import com.wziem.backend.repositories.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final JwtConfig jwtConfig;
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;

    public Cookie generateRefreshTokenCookie(User user){
        String refreshToken = jwtService.generateRefreshToken(user);
        var cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/auth/refresh");
        cookie.setMaxAge(jwtConfig.getRefreshTokenExpiration());
        cookie.setSecure(true);
        return cookie;
    }


    public JwtDto loginUser(@Valid LoginRequest request, HttpServletResponse response){
        //authenticating credentials
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String accessToken = jwtService.generateAccessToken(user);
        Cookie cookie = generateRefreshTokenCookie(user);
        response.addCookie(cookie);

        return new JwtDto(accessToken);
    }
}
