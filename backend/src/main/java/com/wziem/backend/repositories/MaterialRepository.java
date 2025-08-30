package com.wziem.backend.repositories;

import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.Material;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface MaterialRepository extends JpaRepository<Material, Long> {
    ArrayList<Material> findByLesson(Lesson lesson);
}
