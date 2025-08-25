package com.wziem.backend.exceptions;

public class SavingEmptyFileException extends RuntimeException {
    public SavingEmptyFileException(String message) {
        super(message);
    }
}
