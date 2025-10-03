package com.wziem.backend.services;

import com.wziem.backend.exceptions.SavingEmptyFileException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CloudStorageService {
    String uploadFile(MultipartFile file) throws IOException;

    String getDownloadUrl(String filename); //filename format: UUID_{filename}
}
