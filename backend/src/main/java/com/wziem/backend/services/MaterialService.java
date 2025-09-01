package com.wziem.backend.services;

import com.wziem.backend.dtos.MaterialDto;
import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.Material;
import com.wziem.backend.entities.MaterialType;
import com.wziem.backend.entities.User;
import com.wziem.backend.exceptions.ForbiddenContentAccessException;
import com.wziem.backend.mappers.MaterialMapper;
import com.wziem.backend.repositories.LessonRepository;
import com.wziem.backend.repositories.MaterialRepository;
import com.wziem.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class MaterialService {
    private final MaterialMapper materialMapper;
    private final MaterialRepository materialRepository;
    private final LessonRepository lessonRepository;
    private final FileStorageService fileStorageService;
    private final UserRepository userRepository;

    public MaterialDto addMaterial(Long id, MultipartFile file, String name) {
        Lesson relatedLesson = lessonRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Lesson Not Found"));

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
                .name(name)
                .build();

        materialRepository.save(material);

        return materialMapper.toDto(material);
    }



    public MaterialDto addMaterial(Long lessonId, String value, MaterialType type, String name) {
        Lesson relatedLesson = lessonRepository.findById(lessonId).orElseThrow(() -> new EntityNotFoundException("Lesson Not Found"));

        Material material = Material.builder().lesson(relatedLesson).value(value).type(type).name(name).build();
        materialRepository.save(material);

        return materialMapper.toDto(material);
    }

    public List<MaterialDto> getRelatedMaterials(Long userId, Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new EntityNotFoundException("Lesson Not Found"));

        if(!Objects.equals(lesson.getStudent().getId(), userId) && !Objects.equals(lesson.getTutor().getId(), userId)) {
            throw new ForbiddenContentAccessException("You don't have permission to access this lesson");
        }

        List<Material> materials = materialRepository.findByLesson(lesson);

        return materials.stream().map(materialMapper::toDto).toList();
    }

    public List<MaterialDto> getAllMaterials(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new EntityNotFoundException("User Not Found"));

        List<Material> userMaterials = materialRepository.findByUser(user);

        return userMaterials.stream().map(materialMapper::toDto).toList();
    }
}
