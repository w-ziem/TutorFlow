package com.wziem.backend.dtos;

import com.wziem.backend.entities.User;
import lombok.Data;

@Data
public class LessonDto {
    private Long id;
    private String tutorName;
    private String studentName;
    private String topic;
}
