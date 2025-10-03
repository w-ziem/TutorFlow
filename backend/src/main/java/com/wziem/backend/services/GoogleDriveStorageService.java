package com.wziem.backend.services;

import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.Permission;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.Collections;

@Service
public class GoogleDriveStorageService implements CloudStorageService {

    private final Drive drive;

    @Value("${app.google.drive.folder}")
    private String folderId;

    public GoogleDriveStorageService(@Value("${app.google.drive.credentials}") String credentialsJson) throws IOException, GeneralSecurityException {
        GoogleCredentials credentials =  ServiceAccountCredentials
                .fromStream(new ByteArrayInputStream(credentialsJson.getBytes(StandardCharsets.UTF_8)))
                .createScoped(Collections.singleton("https://www.googleapis.com/auth/drive"));

        drive = new Drive.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                GsonFactory.getDefaultInstance(),
                new HttpCredentialsAdapter(credentials))
                .setApplicationName("TutorFlow")
                .build();
    }

    @Override
    public String uploadFile(MultipartFile multipartFile) throws IOException {
        File fileMetadata = new File();
        fileMetadata.setName(multipartFile.getOriginalFilename());

        if (folderId != null && !folderId.isEmpty()) {
            fileMetadata.setParents(Collections.singletonList(folderId));
        }

        File uploadedFile = drive.files().create(
                fileMetadata,
                new com.google.api.client.http.InputStreamContent(
                        multipartFile.getContentType(),
                        multipartFile.getInputStream()
                )
        ).setFields("id").execute();

        Permission permission = new Permission()
                .setType("anyone")
                .setRole("reader");
        drive.permissions().create(uploadedFile.getId(), permission).execute();

        return getDownloadUrl(uploadedFile.getId());
    }

    @Override
    public String getDownloadUrl(String fileId) {
        return "https://drive.google.com/uc?id=" + fileId + "&export=download";
    }
}
