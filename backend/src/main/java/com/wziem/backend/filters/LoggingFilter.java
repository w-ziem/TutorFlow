package com.wziem.backend.filters;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;

@Component
public class LoggingFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        System.out.println("Request: " + request.getRequestURI());
        System.out.println("Method: " + request.getMethod());
        System.out.println("Headers: " + request.getHeaderNames());
        System.out.println("Params: " + request.getParameterMap());
        System.out.println("Body: " + request.getReader());
        System.out.println("Cookies: " + Arrays.toString(request.getCookies()));
        filterChain.doFilter(request, response);
        System.out.println("Response: " + response.getStatus());
    }
}
