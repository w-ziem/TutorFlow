package com.wziem.backend.exceptions;

public class ErrorFetchingResponseException extends RuntimeException {
    public ErrorFetchingResponseException(String message) {
        super(message);
    }
}
