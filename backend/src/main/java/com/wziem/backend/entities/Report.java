package com.wziem.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    private User student;

    @NotNull
    @OneToMany(mappedBy = "report", cascade = CascadeType.ALL)
    private List<Lesson> lessons;

    @NotNull
    @Column(name = "response")
    private String response;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

}