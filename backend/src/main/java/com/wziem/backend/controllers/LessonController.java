package com.wziem.backend.controllers;


import com.wziem.backend.dtos.CreateLessonRequest;
import com.wziem.backend.dtos.LessonDto;
import com.wziem.backend.entities.Lesson;
import com.wziem.backend.services.LessonService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/lesson")
public class LessonController {
    private final LessonService lessonService;

    @PostMapping
    public ResponseEntity<LessonDto> createLesson(@Valid @RequestBody CreateLessonRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long tutorId = (Long) authentication.getPrincipal();
        LessonDto createdLesson = lessonService.createLesson(tutorId, request.getStudentId(), request.getTopic());

        return ResponseEntity.status(HttpStatus.CREATED).body(createdLesson);
    }

    //tutor as well as student should be able to access thier lessons
    @GetMapping
    public ResponseEntity<List<LessonDto>> getLessons() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();
        List<LessonDto> res = lessonService.getUsersLessons(userId);

        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getLesson(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();
        Lesson fetchedLesson = lessonService.getLessonById(userId, id);

        return ResponseEntity.ok().body(fetchedLesson);
    }

    //TODO: updating lesson (patch vs put) for adding notes to then use for prompts
    //TODO: delete lesson

    //TODO: test for all endpoints with postman (db reset when migrating)

}
