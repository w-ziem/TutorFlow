package com.wziem.backend.services;

import com.wziem.backend.exceptions.SavingEmptyFileException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    private final Path root = Paths.get("resources/uploads");

    public FileStorageService() throws IOException {
        if (!Files.exists(root)) {
            Files.createDirectories(root);
        }
    }

    public String saveFile(MultipartFile file) throws SavingEmptyFileException, IOException {
        if (file.isEmpty()) {
            throw new SavingEmptyFileException("File is empty");
        }

        // creating unique name
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();

        Path destination = root.resolve(filename);

        file.transferTo(destination.toFile());

        return destination.toString();
    }
}
