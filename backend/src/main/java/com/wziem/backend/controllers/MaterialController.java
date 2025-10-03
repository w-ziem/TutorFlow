package com.wziem.backend.controllers;


import com.wziem.backend.dtos.MaterialDto;
import com.wziem.backend.dtos.MaterialRequest;
import com.wziem.backend.dtos.MaterialResourceDto;
import com.wziem.backend.entities.Material;
import com.wziem.backend.entities.MaterialType;
import com.wziem.backend.exceptions.UnknownFileTypeException;
import com.wziem.backend.services.MaterialService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@AllArgsConstructor
@RestController
public class MaterialController {
    private final MaterialService materialService;


    @PostMapping("/lessons/{id}/materials")
    public ResponseEntity<?> addMaterial(
    @PathVariable Long id, @Valid @RequestPart(value = "data") MaterialRequest request, @RequestPart(value = "file", required = false) MultipartFile file) {

        MaterialDto res;

        if (MaterialType.FILE.equals(request.getType())) {
            if (file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body("File is missing");
            }
            //if the type is file let materialService handle upload
            res = materialService.addMaterial(id, file, request.getName());
        } else {
            //else just save the value
            res = materialService.addMaterial(id, request.getValue(), request.getType(), request.getName());
        }


        return ResponseEntity.status(HttpStatus.CREATED).body(res);

    }


    @GetMapping("/lessons/{id}/materials")
    public ResponseEntity<?> getRelatedMaterials(@PathVariable(value = "id") Long lessonId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();


        List<MaterialDto> materials = materialService.getRelatedMaterials(userId, lessonId);

        return ResponseEntity.ok().body(materials);
    }

    @GetMapping("/materials")
    public ResponseEntity<?> getMaterials(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();
        List<MaterialDto> materials = materialService.getAllMaterials(userId);

        return ResponseEntity.ok().body(materials);
    }

    @Deprecated
    @GetMapping("/materials/{id}/download")
    public ResponseEntity<?> downloadMaterial(@PathVariable(value = "id") Long materialId){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();

        MaterialResourceDto material = materialService.getMaterialPath(userId, materialId);
        Resource resource = new FileSystemResource(material.getPath());

        String encodedFilename = UriUtils.encode(material.getName(), StandardCharsets.UTF_8);
        String mimeType = null;
        try {
            mimeType = Files.probeContentType(material.getPath());
        } catch (IOException e) {
            throw new UnknownFileTypeException("Cannot determine file type");
        }
        if (mimeType == null) {
            mimeType = "application/octet-stream"; //fallback
        }

        System.out.println(mimeType);
        MediaType contentType = MediaType.parseMediaType(mimeType);
        System.out.println(contentType);


        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename*=UTF-8''" + encodedFilename)
                .contentType(contentType)
                .body(resource);
    }

}
