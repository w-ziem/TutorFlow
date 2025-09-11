package com.wziem.backend.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReportSummary {
    private Long id;
    private String studentName;
    private LocalDateTime createdDate;
}
