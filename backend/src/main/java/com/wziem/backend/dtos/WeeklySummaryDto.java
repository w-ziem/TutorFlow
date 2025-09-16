package com.wziem.backend.dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class WeeklySummaryDto {
    private Integer lessonsThisWeek;
    private BigDecimal averageHourRate;
    private BigDecimal earningsThisWeek;
    private Double averageGrade;
}
