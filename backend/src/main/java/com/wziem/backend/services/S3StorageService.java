package com.wziem.backend.services;

import com.wziem.backend.exceptions.S3FileUploadException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;

@Primary
@Service("s3")
@RequiredArgsConstructor
@Slf4j
public class S3StorageService implements CloudStorageService{
    private final S3Client s3Client;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();

        try{
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(fileName)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(putObjectRequest,
                    RequestBody.fromBytes(file.getBytes()));
            log.info("File uploaded successfully: {}", fileName);
            return getDownloadUrl(fileName);
        } catch (Exception e){
            log.error("Error while uploading file to S3: {}", e.getMessage());
            throw new S3FileUploadException("Error while uploading file to S3: " + e.getMessage());
        }
    }

    @Override
    public String getDownloadUrl(String filename) {
        GetUrlRequest getUrlRequest = GetUrlRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();

        return s3Client.utilities().getUrl(getUrlRequest).toString();
    }

}
