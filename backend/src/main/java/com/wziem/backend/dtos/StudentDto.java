package com.wziem.backend.dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class StudentDto {
    private String name;
    private String email;
    private String communicationLink;
    private String educationLevel;
    private BigDecimal hourRate;
    private Integer lessonCount;
}
