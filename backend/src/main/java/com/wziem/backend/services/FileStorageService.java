package com.wziem.backend.services;

import com.wziem.backend.exceptions.SavingEmptyFileException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${app.upload.dir:${user.home}/tutorflow/uploads}")
    private String uploadDir;

    private Path root;

    @PostConstruct
    public void init() throws IOException {
        root = Paths.get(uploadDir).toAbsolutePath().normalize();
        if (!Files.exists(root)) {
            Files.createDirectories(root);
        }
    }

    public String saveFile(MultipartFile file) throws SavingEmptyFileException, IOException {
        if (file.isEmpty()) {
            throw new SavingEmptyFileException("File is empty");
        }

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path destination = root.resolve(filename);

        // Sprawdź, czy ścieżka nie wychodzi poza dozwolony katalog (security)
        if (!destination.normalize().startsWith(root)) {
            throw new IOException("Cannot store file outside current directory");
        }


        file.transferTo(destination.toFile());

        return filename;
    }

    public Path getFullPath(String filename) {
        if (filename == null || filename.trim().isEmpty()) {
            throw new IllegalArgumentException("Filename cannot be null or empty");
        }

        Path filePath = root.resolve(filename);

        if (!filePath.normalize().startsWith(root)) {
            throw new IllegalArgumentException("Invalid filename - path traversal attempt detected");
        }

        return filePath;
    }

}