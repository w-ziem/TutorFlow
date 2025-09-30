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

    List<Lesson> findLessonsByStudentAndTutor(User student, User tutor);


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



    @Query(" SELECT AVG(l.grade) FROM Lesson l WHERE (l.tutor = :user OR l.student = :user) AND l.completed IS TRUE AND l.date BETWEEN :startDate AND :currentDate")
    Double getAvgGradeByUserAndDate(User user, LocalDateTime startDate, LocalDateTime currentDate);


    @Query(" SELECT AVG(l.grade) FROM Lesson l WHERE (l.tutor = :user OR l.student = :user) AND l.completed IS TRUE")
    Double getAvgGradeByUser(User user);

    // Info for attention required statistics
    @Query(value = """
    SELECT s.id,
           s.name,
           (CURRENT_DATE - MAX(l.date::date)) AS daysSinceLastLesson
    FROM tutorflow.public.lessons l
    JOIN tutorflow.public.users s ON l.student_id = s.id
    WHERE l.tutor_id = :tutorId
      AND l.is_completed = true
    GROUP BY s.id, s.name
    HAVING (CURRENT_DATE - MAX(l.date::date)) > :minDays
    ORDER BY (CURRENT_DATE - MAX(l.date::date)) DESC
    """, nativeQuery = true)
    List<Object[]> findStudentsWithLongBreakSinceLastLesson(@Param("tutorId") Long tutorId, @Param("minDays") int minDays);

    @Query(value = """
    SELECT s.id,
           s.name,
           COUNT(l.id) AS unpaidCount,
           (CURRENT_DATE - MIN(l.date::date)) AS oldestUnpaidDays
    FROM tutorflow.public.lessons l
    JOIN tutorflow.public.users s ON l.student_id = s.id
    WHERE l.tutor_id = :tutorId
      AND l.is_completed = true
      AND l.is_paid = false
      AND (CURRENT_DATE - l.date::date) > :minDays
    GROUP BY s.id, s.name
    HAVING COUNT(l.id) > 0
    ORDER BY (CURRENT_DATE - MIN(l.date::date)) DESC
    """, nativeQuery = true)
    List<Object[]> findStudentsWithUnpaidLessons(@Param("tutorId") Long tutorId, @Param("minDays") int minDays);

    @Query("""
        SELECT l.id, s.name, l.grade, l.date, l.topic
        FROM Lesson l
        JOIN l.student s
        WHERE l.tutor.id = :tutorId
          AND l.completed = true
          AND l.grade IS NOT NULL
          AND l.grade < :maxGrade
          AND l.date > :sinceDate
        ORDER BY l.date DESC
        """)
    List<Object[]> findRecentLessonsWithLowGrades(@Param("tutorId") Long tutorId, @Param("maxGrade") Long maxGrade, @Param("sinceDate") LocalDateTime sinceDate);

    @Query("""
        SELECT SUM(l.duration/60.0)
        FROM Lesson l
        WHERE (l.tutor = :user OR l.student = :user)
        AND l.date BETWEEN :startDate AND :currentDate
        AND l.completed IS TRUE
    """)
    Double getHoursByUserAndDate(User user, LocalDateTime startDate, LocalDateTime currentDate);

    @Query("SELECT COUNT(l) FROM Lesson l WHERE l.student = :student AND l.paid IS FALSE")
    Integer getUnpaidLessonCountByStudent(@Param("student") User student);
}
