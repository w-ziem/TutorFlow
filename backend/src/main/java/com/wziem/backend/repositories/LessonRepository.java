package com.wziem.backend.repositories;

import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface LessonRepository extends JpaRepository<Lesson, Long> {

    @EntityGraph(attributePaths = {"student"})
    @Query("SELECT l FROM Lesson l WHERE l.tutor = :user OR l.student = :user ORDER BY l.date DESC")
    List<Lesson> findLessonByUser(@Param("user") User user, Pageable pageable);

    //finding lessons for reports
    @EntityGraph(attributePaths = {"student"})
    @Query("SELECT l FROM Lesson l WHERE l.tutor = :user OR l.student = :user AND l.report IS NULL ORDER BY l.date DESC")
    List<Lesson> findUnusedLessonByUser(@Param("user") User user, Pageable pageable);

    @Query("SELECT l FROM Lesson l WHERE l.student = :student AND l.grade < 6 AND l.report IS NULL")
    List<Lesson> findLessonsWithBadGradesForStudent(@Param("student") User student);

    @Query("""
           SELECT COUNT(l) FROM Lesson l 
           WHERE (l.tutor = :user OR l.student = :user) 
           AND l.date BETWEEN :startDate AND :currentDate 
           AND l.completed IS TRUE
           """)
    Integer countLessonsByUserAndDate(User user, LocalDateTime startDate, LocalDateTime currentDate);

    @Query("""
        SELECT SUM(l.duration/60.0 * p.hourRate)
        FROM Lesson l
        JOIN Profile p ON (p.tutor = :user AND p.student = l.student)
        WHERE (l.tutor = :user OR l.student = :user)
        AND l.date BETWEEN :startDate AND :currentDate
        AND l.completed IS TRUE
    """)
    BigDecimal sumTotalEarningsByUserAndDate(User user, LocalDateTime startDate, LocalDateTime currentDate);

    @Query("""
        SELECT SUM(l.duration/60.0 * p.hourRate) / SUM(l.duration/60.0)
        FROM Lesson l
        JOIN Profile p ON (p.tutor = :user AND p.student = l.student)
        WHERE (l.tutor = :user OR l.student = :user)
        AND l.date BETWEEN :startDate AND :currentDate
        AND l.completed IS TRUE
    """)
    BigDecimal getAvgHourRateByUserAndDate(User user, LocalDateTime startDate, LocalDateTime currentDate);

    @Query(" SELECT AVG(l.grade) FROM Lesson l WHERE (l.tutor = :user OR l.student = :user) AND l.completed IS TRUE ")
    Double getAvgGradeByUserAndDate(User user, LocalDateTime startDate, LocalDateTime currentDate);
}
