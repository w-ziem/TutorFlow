package com.wziem.backend.services;

import com.wziem.backend.dtos.LessonDto;
import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.User;
import com.wziem.backend.exceptions.ForbiddenContentAccessException;
import com.wziem.backend.mappers.LessonMapper;
import com.wziem.backend.mappers.UserMapper;
import com.wziem.backend.repositories.LessonRepository;
import com.wziem.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    private final LessonMapper lessonMapper;
    private final UserMapper userMapper;


    public LessonDto createLesson(Long tutorId, String studentEmail, String topic) {
        User tutor = userRepository.findById(tutorId).orElseThrow(() ->  new UsernameNotFoundException("tutor not found"));
        User  student = userRepository.findByEmail(studentEmail).orElseThrow(() -> new UsernameNotFoundException("student not found"));

        if (!tutor.equals(student.getTutor())) {
            throw new ForbiddenContentAccessException("You don't have permission to create lesson for students not connected to you");
        }

        Lesson lesson = Lesson.builder()
                .date(LocalDateTime.now())
                .topic(topic)
                .tutor(tutor)
                .student(student)
                .build();
        lessonRepository.save(lesson);

        return lessonMapper.toDto(lesson);
    }

    public List<LessonDto> getUsersLessons(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("user not found"));
        List<Lesson> lessons = lessonRepository.findAllByUser(user);

        return lessons.stream().map(lessonMapper::toDto).toList();
    }

    public Lesson getLessonById(Long userId, Long id) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("user not found"));
        Lesson lesson = lessonRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("lesson not found"));

        if(!lesson.getTutor().getId().equals(user.getId()) && !lesson.getStudent().getId().equals(user.getId())) {
            throw new ForbiddenContentAccessException("You don't have permission to access lesson");
        }

        return lesson;
    }
}
