package com.wziem.backend.dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProfileDto {
    private Long id;
    private String studentName;
    private String tutorName;
    private String communicationLink;
    private BigDecimal hourRate;
    private String educationLevel;
}
