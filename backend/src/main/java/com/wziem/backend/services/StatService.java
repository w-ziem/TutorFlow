package com.wziem.backend.services;

import com.wziem.backend.dtos.WeeklySummaryDto;
import com.wziem.backend.entities.User;
import com.wziem.backend.repositories.LessonRepository;
import com.wziem.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
}
