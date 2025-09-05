package com.wziem.backend.dtos;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReportDto {
    private String studentName;
    private LocalDateTime createdDate;
    private String response;

    //TODO: nie mappuja sie lekcje albo nie przypisuja w sumie
    private List<LessonDto> lessons;
}
