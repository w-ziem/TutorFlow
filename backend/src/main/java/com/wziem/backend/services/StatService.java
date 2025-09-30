package com.wziem.backend.services;

import com.wziem.backend.dtos.*;
import com.wziem.backend.entities.Role;
import com.wziem.backend.entities.User;
import com.wziem.backend.repositories.LessonRepository;
import com.wziem.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StatService {
    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;

    public WeeklySummaryDto getStats(Long userId, Role role, String range) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        LocalDateTime currentDate = null;
        LocalDateTime startDate = null;
        if (range.equals("weekly")) {
            currentDate = LocalDateTime.now();
            startDate = currentDate.minusWeeks(1);
        }

        if (role.equals(Role.TUTOR)) {
            return WeeklySummaryTutorDto.builder()
                    .averageGrade(getAverageGradeByDate(user, startDate, currentDate))
                    .averageHourRate(getAverageHourRate(user, startDate, currentDate))
                    .earningsThisWeek(getEarnings(user, startDate, currentDate))
                    .lessonsThisWeek(getLessonCount(user, startDate, currentDate))
                    .build();
        } else {
            return WeeklySummaryStudentDto.builder()
                    .averageGrade(getAverageGrade(user))
                    .lessonsThisWeek(getLessonCount(user, startDate, currentDate))
                    .hoursThisWeek(getHourCount(user, startDate, currentDate))
                    .build();
        }
    }


    private Double getHourCount(User user, LocalDateTime startDate, LocalDateTime currentDate) {
        return Optional.ofNullable(
                lessonRepository.getHoursByUserAndDate(user, startDate, currentDate)
        ).orElse(0.0);
    }

    private Integer getLessonCount(User user, LocalDateTime startDate, LocalDateTime currentDate) {
        return Optional.ofNullable(
                lessonRepository.countLessonsByUserAndDate(user, startDate, currentDate)
        ).orElse(0);
    }

    private BigDecimal getEarnings(User user, LocalDateTime startDate, LocalDateTime currentDate) {
        return Optional.ofNullable(
                lessonRepository.sumTotalEarningsByUserAndDate(user, startDate, currentDate)
        ).orElse(BigDecimal.ZERO);
    }

    private BigDecimal getAverageHourRate(User user, LocalDateTime startDate, LocalDateTime currentDate) {
        return Optional.ofNullable(
                lessonRepository.getAvgHourRateByUserAndDate(user, startDate, currentDate)
        ).orElse(BigDecimal.ZERO);
    }

    private Double getAverageGradeByDate(User user, LocalDateTime startDate, LocalDateTime currentDate) {
        return Optional.ofNullable(
                lessonRepository.getAvgGradeByUserAndDate(user, startDate, currentDate)
        ).orElse(0.0);
    }

    private Double getAverageGrade(User user) {
        return Optional.ofNullable(
                lessonRepository.getAvgGradeByUser(user)
        ).orElse(0.0);
    }



    public List<AttentionItemDto> getAttentionSensitiveStats(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));


        List<AttentionItemDto> items = new ArrayList<>();

        items.addAll(getLongBreakItems(userId));

        items.addAll(getUnpaidLessonsItems(userId));

        items.addAll(getLowGradeItems(userId));

        return items;
    }

    private List<AttentionItemDto> getLongBreakItems(Long tutorId) {
        List<AttentionItemDto> items = new ArrayList<>();

        List<Object[]> studentsWithLongBreak = lessonRepository.findStudentsWithLongBreakSinceLastLesson(tutorId, 7);

        for (Object[] row : studentsWithLongBreak) {
            Long studentId = (Long) row[0];
            String studentName = (String) row[1];
            Integer daysSinceLastLesson = (Integer) row[2];

            AttentionItemDto item = AttentionItemDto.builder()
                    .type(AttentionType.INFO)
                    .title("Długa przerwa w lekcjach")
                    .description("Miałeś ostatnią lekcję z uczniem " + studentName + " " + daysSinceLastLesson + " dni temu")
                    .student(studentName)
                    .actionText("Skontaktuj się z uczniem")
                    .data(Map.of(
                            "days", daysSinceLastLesson,
                            "studentId", studentId
                    ))
                    .build();

            items.add(item);
        }

        return items;
    }

    private List<AttentionItemDto> getUnpaidLessonsItems(Long tutorId) {
        List<AttentionItemDto> items = new ArrayList<>();

        List<Object[]> studentsWithUnpaidLessons = lessonRepository.findStudentsWithUnpaidLessons(tutorId, 7);

        for (Object[] row : studentsWithUnpaidLessons) {
            Long studentId = (Long) row[0];
            String studentName = (String) row[1];
            Long unpaidLessonsCount = (Long) row[2];
            Integer oldestUnpaidDays = (Integer) row[3];

            AttentionItemDto item = AttentionItemDto.builder()
                    .type(AttentionType.PAYMENT)
                    .title("Nieopłacone lekcje")
                    .description(unpaidLessonsCount + " lekcje nie zostały opłacone od ponad " + oldestUnpaidDays + " dni")
                    .student(studentName)
                    .actionText("Sprawdź status płatności")
                    .data(Map.of(
                            "lessonsCount", unpaidLessonsCount.intValue(),
                            "daysOverdue", oldestUnpaidDays,
                            "studentId", studentId
                    ))
                    .build();

            items.add(item);
        }

        return items;
    }

    private List<AttentionItemDto> getLowGradeItems(Long tutorId) {
        List<AttentionItemDto> items = new ArrayList<>();

        List<Object[]> lessonsWithLowGrades = lessonRepository.findRecentLessonsWithLowGrades(tutorId, 5L, LocalDateTime.now().minusDays(7));

        for (Object[] row : lessonsWithLowGrades) {
            Long lessonId = (Long) row[0];
            String studentName = (String) row[1];
            Long grade = (Long) row[2];
            LocalDateTime lessonDate = (LocalDateTime) row[3];
            String topic = (String) row[4];

            AttentionItemDto item = AttentionItemDto.builder()
                    .type(AttentionType.PERFORMANCE)
                    .title("Niska ocena ucznia")
                    .description("Uczeń " + studentName + " otrzymał ocenę " + grade + "/10 z lekcji: " + topic)
                    .student(studentName)
                    .actionText("Zobacz szczegóły lekcji")
                    .data(Map.of(
                            "grade", grade.intValue(),
                            "maxGrade", 10,
                            "lessonDate", lessonDate.toLocalDate().toString(),
                            "lessonId", lessonId,
                            "topic", topic
                    ))
                    .build();

            items.add(item);
        }

        return items;
    }

    public PaymentStatusDto getPaymentStatus(Long studentId) {
        User student = userRepository.findById(studentId).orElseThrow(() -> new UsernameNotFoundException("Student not found"));
        Integer unpaidCount = lessonRepository.getUnpaidLessonCountByStudent(student);

        return new PaymentStatusDto(!unpaidCount.equals(0), unpaidCount);
    }
}


