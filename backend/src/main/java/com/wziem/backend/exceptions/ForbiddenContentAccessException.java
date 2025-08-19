package com.wziem.backend.exceptions;

public class ForbiddenContentAccessException extends RuntimeException {
    public ForbiddenContentAccessException(String message) {
        super(message);
    }
}
