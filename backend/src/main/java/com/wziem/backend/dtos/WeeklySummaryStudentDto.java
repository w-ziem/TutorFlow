package com.wziem.backend.dtos;

import com.fasterxml.jackson.annotation.JsonTypeName;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@JsonTypeName("student")
public class WeeklySummaryStudentDto extends WeeklySummaryDto  {
    Integer lessonsThisWeek;
    Double averageGrade;
    Double hoursThisWeek;
}
