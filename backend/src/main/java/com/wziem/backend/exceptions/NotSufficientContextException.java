package com.wziem.backend.exceptions;

public class NotSufficientContextException extends RuntimeException {
    public NotSufficientContextException(String message) {
        super(message);
    }
}
