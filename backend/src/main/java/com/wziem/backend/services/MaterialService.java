package com.wziem.backend.services;

import com.wziem.backend.dtos.MaterialDto;
import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.Material;
import com.wziem.backend.entities.MaterialType;
import com.wziem.backend.mappers.MaterialMapper;
import com.wziem.backend.repositories.LessonRepository;
import com.wziem.backend.repositories.MaterialRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@AllArgsConstructor
public class MaterialService {
    private final MaterialMapper materialMapper;
    private final MaterialRepository materialRepository;
    private final LessonRepository lessonRepository;
    private final FileStorageService fileStorageService;

    public MaterialDto addMaterial(Long id, MultipartFile file) {
        Lesson relatedLesson = lessonRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("Lesson Not Found"));

        String filepath;
        try {
            filepath = fileStorageService.saveFile(file);
        } catch (IOException e) {
            throw new RuntimeException("Problem with saving file: " + e.getMessage(), e);
        }

        Material material = Material.builder()
                .type(MaterialType.FILE)
                .lesson(relatedLesson)
                .value(filepath)
                .build();

        materialRepository.save(material);

        return materialMapper.toDto(material);
    }



    public MaterialDto addMaterial(Long lessonId, String value, MaterialType type) {
        Lesson relatedLesson = lessonRepository.findById(lessonId).orElseThrow(() -> new UsernameNotFoundException("Lesson Not Found"));

        Material material = Material.builder().lesson(relatedLesson).value(value).type(type).build();
        materialRepository.save(material);

        return materialMapper.toDto(material);
    }

}
