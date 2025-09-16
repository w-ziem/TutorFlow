package com.wziem.backend.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "lessons")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Size(max = 255)
    @NotNull
    @Column(name = "topic")
    private String topic;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "tutor_id")
    private User tutor;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "student_id")
    private User student;

    @NotNull
    @Column(name = "date")
    private LocalDateTime date;

    @Column(name = "note")
    private String note;

    @Column(name = "whiteboard")
    private String whiteboardLink;

    @Column(name = "is_completed")
    private boolean completed;

    @Column(name = "is_paid")
    private boolean paid;

    @Column(name = "grade")
    private Long grade;

    @ManyToOne
    @JoinColumn(name = "report_id")
    private Report report;

    @Column(name = "duration")
    private Integer duration; //minutes
}