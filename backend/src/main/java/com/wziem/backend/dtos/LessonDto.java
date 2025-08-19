package com.wziem.backend.dtos;

import lombok.Data;

@Data
public class LessonDto {
    private Long id;
    private String tutor;
    private String student;
    private String topic;
}
