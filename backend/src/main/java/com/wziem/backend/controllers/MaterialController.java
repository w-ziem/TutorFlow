package com.wziem.backend.controllers;


import com.wziem.backend.dtos.MaterialDto;
import com.wziem.backend.dtos.MaterialRequest;
import com.wziem.backend.entities.MaterialType;
import com.wziem.backend.services.MaterialService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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
}
