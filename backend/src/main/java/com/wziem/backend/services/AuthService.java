package com.wziem.backend.services;

import com.wziem.backend.config.JwtConfig;
import com.wziem.backend.dtos.JwtDto;
import com.wziem.backend.dtos.LoginRequest;
import com.wziem.backend.dtos.RegisterRequest;
import com.wziem.backend.dtos.UserDto;
import com.wziem.backend.entities.User;
import com.wziem.backend.exceptions.RefreshTokenExpiredException;
import com.wziem.backend.exceptions.UserAlreadyExistException;
import com.wziem.backend.mappers.UserMapper;
import com.wziem.backend.repositories.UserRepository;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    private final JwtService jwtService;
    private final JwtConfig jwtConfig;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

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


    public UserDto registerUser(@Valid RegisterRequest request){
        if( userRepository.findByEmail(request.getEmail()).isPresent() ) { throw new UserAlreadyExistException("User with this email already exists"); }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();

        userRepository.save(user);

        return userMapper.toDto(user);
    }

    public JwtDto refteshAccessToken(String req) throws ExpiredJwtException {
        Jwt refreshToken = jwtService.parse(req);
        if(refreshToken == null || refreshToken.isExpired()) { throw new RefreshTokenExpiredException("Refresh token expired"); }

        User user = userRepository.findById(refreshToken.getUserId()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        String newToken = jwtService.generateAccessToken(user);
        return new JwtDto(newToken);
    }
}
