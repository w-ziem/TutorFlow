package com.wziem.backend.repositories;

import com.wziem.backend.entities.Report;
import com.wziem.backend.entities.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReportRepositiory extends JpaRepository<Report, Long> {

    @EntityGraph(attributePaths = {"student"})
    @Query("SELECT r FROM Report r WHERE r.student = :user OR r.student.tutor = :studentId")
    List<Report> findAllByUser(User user);
}
