package com.wziem.backend.services;

import com.wziem.backend.dtos.AttentionItemDto;
import com.wziem.backend.dtos.AttentionType;
import com.wziem.backend.dtos.WeeklySummaryDto;
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

@AllArgsConstructor
@Service
public class StatService {
    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;

    public WeeklySummaryDto getStats(Long userId, String range) {
        User user = userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        LocalDateTime currentDate = null;
        LocalDateTime startDate = null;
        if (range.equals("weekly")) {
            currentDate = LocalDateTime.now();
            startDate = currentDate.minusWeeks(1);
        }
        //additional logic for different timespans in the future

        WeeklySummaryDto weeklySummaryDto = new WeeklySummaryDto();
        weeklySummaryDto.setAverageGrade(getAverageGrade(user, startDate, currentDate));
        weeklySummaryDto.setAverageHourRate(getAverageHourRate(user, startDate, currentDate));
        weeklySummaryDto.setEarningsThisWeek(getEarnings(user, startDate, currentDate));
        weeklySummaryDto.setLessonsThisWeek(getLessonCount(user, startDate, currentDate));

        return weeklySummaryDto;
    }

    private Integer getLessonCount(User user, LocalDateTime startDate, LocalDateTime currentDate) {
        return lessonRepository.countLessonsByUserAndDate(user, startDate, currentDate);
    }

    private BigDecimal getEarnings(User user, LocalDateTime startDate, LocalDateTime currentDate) {
        return lessonRepository.sumTotalEarningsByUserAndDate(user, startDate, currentDate);
    }

    private BigDecimal getAverageHourRate(User user, LocalDateTime startDate, LocalDateTime currentDate) {
        return lessonRepository.getAvgHourRateByUserAndDate(user, startDate, currentDate);
    }

    private Double getAverageGrade(User user, LocalDateTime startDate, LocalDateTime currentDate) {
        return lessonRepository.getAvgGradeByUserAndDate(user, startDate, currentDate);
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
}


