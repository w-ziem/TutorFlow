package com.wziem.backend.controllers;


import com.wziem.backend.dtos.MaterialDto;
import com.wziem.backend.dtos.MaterialRequest;
import com.wziem.backend.entities.MaterialType;
import com.wziem.backend.services.MaterialService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;



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
            res = materialService.addMaterial(id, file);
        } else {
            //else just save the value
            res = materialService.addMaterial(id, request.getValue());
        }


        return ResponseEntity.status(HttpStatus.CREATED).body(res);

    }
}
