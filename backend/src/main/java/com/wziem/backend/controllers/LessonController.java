package com.wziem.backend.controllers;


import com.wziem.backend.dtos.CreateLessonRequest;
import com.wziem.backend.dtos.FinishLessonRequest;
import com.wziem.backend.dtos.LessonDto;
import com.wziem.backend.entities.Lesson;
import com.wziem.backend.mappers.LessonMapper;
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
@RequestMapping("/lessons")
public class LessonController {
    private final LessonService lessonService;
    private final LessonMapper lessonMapper;

    @PostMapping
    public ResponseEntity<LessonDto> createLesson(@Valid @RequestBody CreateLessonRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long tutorId = (Long) authentication.getPrincipal();
        LessonDto createdLesson = lessonService.createLesson(tutorId, request.getStudentEmail(), request.getTopic(), request.getWhiteboardLink());

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

    @GetMapping("/recent")
    public ResponseEntity<List<LessonDto>> getRecentLessons() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();
        List<LessonDto> res = lessonService.getUsersRecentLessons(userId);

        return ResponseEntity.ok().body(res);
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getLesson(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();
        Lesson fetchedLesson = lessonService.getLessonById(userId, id);
        System.out.println(fetchedLesson);

        return ResponseEntity.ok().body(lessonMapper.toDto(fetchedLesson));
    }

    @PostMapping("/{id}/finish")
    public ResponseEntity<?> finishLesson(@PathVariable(value = "id") Long lessonId, @Valid @RequestBody FinishLessonRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();

        lessonService.finishLesson(userId, lessonId, request.getComment(), request.getGrade());

        return ResponseEntity.ok().build();
    }


}
