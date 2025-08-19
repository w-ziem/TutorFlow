package com.wziem.backend.repositories;

import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface LessonRepository extends JpaRepository<Lesson, Long> {
    @Query("SELECT l FROM Lesson l WHERE l.tutor = :user OR l.student = :user")
    List<Lesson> findAllByUser(@Param("user") User user);
}
