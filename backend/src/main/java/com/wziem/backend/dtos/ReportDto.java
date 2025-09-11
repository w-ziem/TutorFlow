package com.wziem.backend.dtos;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReportDto {
    private Long id;
    private String studentName;
    private LocalDateTime createdDate;
    private String response;
    private List<String> lessonNames;
}
