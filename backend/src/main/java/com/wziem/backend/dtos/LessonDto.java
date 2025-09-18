package com.wziem.backend.dtos;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class LessonDto {
    private Long id;
    private String tutorName;
    private String studentName;
    private String topic;
    private LocalDateTime date;
    private String whiteboardLink;
    private boolean paid;
    private boolean completed;
    private Long grade;
    private String note;
    private Integer duration;

}
