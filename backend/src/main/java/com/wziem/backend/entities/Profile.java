package com.wziem.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Entity
@Table(name = "profiles")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE}
    )
    @JoinColumn(name = "student_id")
    private User student;


    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE}
    )
    @JoinColumn(name = "tutor_id")
    private User tutor;


    @Column(name = "rate")
    private BigDecimal houtRate;


    @Column(name = "lesson_count")
    private Integer lessonCount;


    @Column(name = "level")
    private String educationLevel;

    @Column(name = "link")
    private String communicationLink;

}