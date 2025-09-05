package com.wziem.backend.services;

import com.wziem.backend.dtos.ReportDto;
import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.Profile;
import com.wziem.backend.entities.Report;
import com.wziem.backend.entities.User;
import com.wziem.backend.exceptions.ForbiddenContentAccessException;
import com.wziem.backend.mappers.ReportMapper;
import com.wziem.backend.repositories.LessonRepository;
import com.wziem.backend.repositories.ProfileRepository;
import com.wziem.backend.repositories.ReportRepositiory;
import com.wziem.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
@Transactional
public class ReportService {
    private final ReportRepositiory reportRepositiory;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final LessonRepository lessonRepository;
    private final OpenAiService openAiService;
    private final ReportMapper reportMapper;

    public ReportDto generateReport(Long studentId, Long tutorId) {
        User student = validateAndGetStudent(studentId, tutorId);
        
        // generating report
        Report report = new Report();
        report.setCreatedDate(LocalDateTime.now());
        report.setStudent(student);
        
        // getting context
        String context = gatherContext(student);
        String response = openAiService.fetchResponse(context);
        report.setResponse(response);

        // update realtions between report and lessons
        updateLessonReportRelations(student, report);


        report = reportRepositiory.save(report);

        return reportMapper.toDto(report);
    }

    private void updateLessonReportRelations(User student, Report report) {
        List<Lesson> badGradeLessons = lessonRepository.findLessonsWithBadGradesForStudent(student);
        
        List<Lesson> latestLessons = lessonRepository.findLessonByUser(student, Pageable.ofSize(3));
        
        Set<Lesson> allRelevantLessons = new HashSet<>();
        allRelevantLessons.addAll(badGradeLessons);
        allRelevantLessons.addAll(latestLessons);
        
        for (Lesson lesson : allRelevantLessons) {
            if (lesson.getReport() == null) {
                lesson.setReport(report);
                lessonRepository.save(lesson); // Explicit save to be sure
            }
        }
    }

    public String gatherContext(User student) {
        StringBuilder context = new StringBuilder();
        appendStudentProfile(context, student);
        appendLessonsWithBadGrades(context, student);
        appendLatestLessons(context, student);
        return context.toString();
    }

    private void appendStudentProfile(StringBuilder context, User student) {
        Profile studentInfo = profileRepository.findByStudent(student);
        if (studentInfo != null && studentInfo.getEducationLevel() != null) {
            context.append("Poziom ucznia: ")
                   .append(studentInfo.getEducationLevel())
                   .append("\n");
        }
    }

    private void appendLessonsWithBadGrades(StringBuilder context, User student) {
        List<Lesson> lessonWithBadRating = lessonRepository.findLessonsWithBadGradesForStudent(student);

        if (lessonWithBadRating.isEmpty()) {
            context.append("Informacje o lekcjach ucznia: ")
                   .append("Nie znaleziono żadnej lekcji z poziomem zrozumienia tematu poniżej 6. ")
                   .append("Szukaj mocnych stron ucznia.\n");
        } else {
            context.append("Znaleziono lekcje z poziomem zrozumienia poniżej 6/10:\n");
            lessonWithBadRating.forEach(lesson -> appendLessonInfo(context, lesson));
        }
    }

    private void appendLatestLessons(StringBuilder context, User student) {
        context.append("Ostatnie lekcje ucznia:\n");
        List<Lesson> latestLessons = lessonRepository.findLessonByUser(student, Pageable.ofSize(3));
        latestLessons.forEach(lesson -> appendLessonInfo(context, lesson));
    }

    private void appendLessonInfo(StringBuilder context, Lesson lesson) {
        context.append("- Temat: ").append(lesson.getTopic()).append("\n");
        context.append("  Poziom zrozumienia: ").append(lesson.getGrade() != null ? lesson.getGrade() : "brak oceny").append("\n");
        context.append("  Notatka korepetytora: ").append(lesson.getNote() != null ? lesson.getNote() : "").append("\n");
        context.append("\n");
    }

    private User validateAndGetStudent(Long studentId, Long tutorId) {
        User student = userRepository.findById(studentId)
            .orElseThrow(() -> new EntityNotFoundException("Student not found"));

        if (!student.getTutor().getId().equals(tutorId)) {
            throw new ForbiddenContentAccessException("You don't have permission to access this student");
        }
        return student;
    }
}
