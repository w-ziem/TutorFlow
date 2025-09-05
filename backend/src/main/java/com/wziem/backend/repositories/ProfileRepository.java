package com.wziem.backend.repositories;

import com.wziem.backend.entities.Profile;
import com.wziem.backend.entities.User;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    @EntityGraph(attributePaths = "student")
    public List<Profile> findAllByTutorId(Long tutorId);

    Profile findByStudent(User student);
}
