package com.wziem.backend.controllers;


import com.wziem.backend.exceptions.ForbiddenContentAccessException;
import com.wziem.backend.exceptions.RefreshTokenExpiredException;
import com.wziem.backend.exceptions.SavingEmptyFileException;
import com.wziem.backend.exceptions.UserAlreadyExistException;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {


    // USER ERROR HANDLERS
    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<Map<String, String>> handleUserAlreadyExistException(UserAlreadyExistException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("error", "User with this email already exists",
                        "field", "email",
                        "action", "redirectToLogin"));
    }
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentialsException(BadCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid credentials",
                        "field", "password"));
    }


    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleUsernameNotFoundException(UsernameNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", ex.getMessage()));
    }


    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleEntityNotFoundException(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", ex.getMessage()));
    }

    @ExceptionHandler(RefreshTokenExpiredException.class)
    public ResponseEntity<Map<String, String>> handleRefreshTokenExpiredException(RefreshTokenExpiredException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", "Refresh token expired", "action", "redirectToRefresh"));
    }


    @ExceptionHandler(ForbiddenContentAccessException.class)
    public ResponseEntity<Map<String, String>> handleForbiddenContentAccessException(ForbiddenContentAccessException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(Map.of("error", "Forbidden Content Access"));
    }


    // MATERIALS ERROR HANDLERS
    @ExceptionHandler(SavingEmptyFileException.class)
    public ResponseEntity<Map<String, String>> handleSavingEmptyFileException(SavingEmptyFileException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", "File is empty"));
    }

    // REST API ERROR HANDLERS

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Map<String, String>> handleHttpMessageNotReadable(HttpMessageNotReadableException ex) {
        return ResponseEntity.badRequest()
                .body(Map.of("error", "Invalid request format. Please check your request body."));
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    // "name" : "NameIsRequired"
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException  exception) {
        var errors = new HashMap<String, String>();
        exception.getBindingResult().getFieldErrors().forEach(error ->
        {errors.put(error.getField(), error.getDefaultMessage());
        } );

        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String, String>> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(Map.of("error", "Student i tutor są już połączeni"));
    }

    // GENERIC ERROR HANDLER
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGenericException(Exception ex) {
        System.err.println("Unexpected error occured: " + ex);
        System.err.println("Error message: " + ex.getMessage());
        System.err.println("Error cause: " + ex.getCause());
        System.err.println("Error stack trace: " + Arrays.toString(ex.getStackTrace()));
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "An unexpected error occurred. Please try again later."));
    }
}