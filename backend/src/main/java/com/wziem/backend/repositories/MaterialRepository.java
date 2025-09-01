package com.wziem.backend.repositories;

import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.Material;
import com.wziem.backend.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;
import java.util.List;

public interface MaterialRepository extends JpaRepository<Material, Long> {
    ArrayList<Material> findByLesson(Lesson lesson);

    @Query("SELECT m FROM Material m WHERE m.lesson.tutor = :user OR m.lesson.student = :user")
    List<Material> findByUser(User user);
}
