package com.wziem.backend.dtos;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Builder
@Getter
@JsonTypeName("tutor")
public class WeeklySummaryTutorDto extends WeeklySummaryDto{
    Integer lessonsThisWeek;
    Double averageGrade;
    BigDecimal averageHourRate;
    BigDecimal earningsThisWeek;
}
