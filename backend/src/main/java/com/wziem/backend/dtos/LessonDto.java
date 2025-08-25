package com.wziem.backend.dtos;

import java.time.LocalDateTime;

import com.wziem.backend.entities.User;
import lombok.Data;

@Data
public class LessonDto {
    private Long id;
    private String tutorName;
    private String studentName;
    private String topic;
    private LocalDateTime date;
    private String whiteboardLink;
}
