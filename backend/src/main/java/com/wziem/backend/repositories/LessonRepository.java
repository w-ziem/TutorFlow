package com.wziem.backend.repositories;

import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface LessonRepository extends JpaRepository<Lesson, Long> {

    @EntityGraph(attributePaths = {"student"})
    @Query("SELECT l FROM Lesson l WHERE l.tutor = :user OR l.student = :user ORDER BY l.date DESC")
    List<Lesson> findLessonByUser(@Param("user") User user, Pageable pageable);

    @Query("SELECT l FROM Lesson l WHERE l.student = :student AND l.grade < 6 AND l.report IS NULL")
    List<Lesson> findLessonsWithBadGradesForStudent(@Param("student") User student);
}
