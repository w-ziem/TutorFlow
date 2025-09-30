package com.wziem.backend.services;

import com.wziem.backend.dtos.LessonDto;
import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.Profile;
import com.wziem.backend.entities.User;
import com.wziem.backend.exceptions.ForbiddenContentAccessException;
import com.wziem.backend.exceptions.PaymentException;
import com.wziem.backend.mappers.LessonMapper;
import com.wziem.backend.repositories.LessonRepository;
import com.wziem.backend.repositories.ProfileRepository;
import com.wziem.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;
    private final UserRepository userRepository;
    private final LessonMapper lessonMapper;
    private final ProfileRepository profileRepository;
    private final PaymentGateway paymentGateway;


    public LessonDto createLesson(Long tutorId, String studentEmail, String topic, String link) {
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
                .whiteboardLink(link)
                .build();
        lessonRepository.save(lesson);

        return lessonMapper.toDto(lesson);
    }

    public List<LessonDto> getUsersLessons(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("user not found"));
        List<Lesson> lessons = lessonRepository.findLessonByUser(user, Pageable.unpaged());

        return lessons.stream().map(lessonMapper::toDto).toList();
    }

    public Lesson getLessonById(Long userId ,Long lessonId) {
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new UsernameNotFoundException("lesson not found"));
        if(!Objects.equals(lesson.getStudent().getId(), userId) && !Objects.equals(lesson.getTutor().getId(), userId)) {
            throw new ForbiddenContentAccessException("You don't have permission to access this lesson");
        }

        return lesson;
    }


    public List<LessonDto> getUsersRecentLessons(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("user not found"));
        List<Lesson> recentLessons = lessonRepository.findLessonByUser(user, Pageable.ofSize(3));

        return recentLessons.stream().map(lessonMapper::toDto).toList();
    }

    @Transactional
    public void finishLesson(Long userId, Long lessonId, String comment, Long grade, Integer duration) {
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new UsernameNotFoundException("lesson not found"));
        if(!Objects.equals(lesson.getStudent().getId(), userId) && !Objects.equals(lesson.getTutor().getId(), userId)) {
            throw new ForbiddenContentAccessException("You don't have permission to access this lesson");
        }

        lesson.setNote(comment);
        lesson.setGrade(grade);
        lesson.setDuration(duration);
        lesson.setCompleted(true);
        Long studentId = lesson.getStudent().getId();
        Profile studentProfile = profileRepository.findByStudentId(studentId).orElseThrow(() -> new EntityNotFoundException("student profile not found"));
        studentProfile.setLessonCount(studentProfile.getLessonCount() + 1);
        profileRepository.save(studentProfile);
        lessonRepository.save(lesson);
    }

    public List<LessonDto> getStudentLessons(Long tutorId, Long studentId) {
        User tutor = userRepository.findById(tutorId).orElseThrow(() -> new UsernameNotFoundException("tutor not found"));
        User student = userRepository.findById(studentId).orElseThrow(() -> new UsernameNotFoundException("student not found"));

        if(!Objects.equals(tutor.getId(), student.getTutor().getId())) {
            throw new ForbiddenContentAccessException("You don't have permission to access this lesson");
        }

        List<Lesson> lessons = lessonRepository.findLessonsByStudentAndTutor(student, tutor);
        return lessons.stream().map(lessonMapper::toDto).toList();
    }

    public String createLessonPaymentSession(Long userId, Long lessonId) throws PaymentException {
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new EntityNotFoundException("lesson not found"));
        if(!Objects.equals(lesson.getStudent().getId(), userId) && !Objects.equals(lesson.getTutor().getId(), userId)) {
            throw new ForbiddenContentAccessException("You don't have permission to access this lesson");
        }

        Profile studentInfo = profileRepository.findByStudentId(userId).orElseThrow(() -> new EntityNotFoundException("student profile not found"));

        PaymentSession session = paymentGateway.createPaymentSession(lesson, studentInfo.getHourRate());

        return session.getPaymentUrl();
    }

    public void handlePaymentSuccess(String lessonId) {
        Lesson lesson = lessonRepository.findById(Long.parseLong(lessonId)).orElseThrow(() -> new EntityNotFoundException("lesson not found"));
        lesson.setPaid(true);
        lessonRepository.save(lesson);
    }
}
