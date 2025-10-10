package com.wziem.backend.exceptions;

public class S3FileUploadException extends RuntimeException {
    public S3FileUploadException(String message) {
        super(message);
    }
}
