package com.wziem.backend.dtos;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class FinishLessonRequest {
    @Min(value = 1, message = "Grade must be in 1-10 range")
    @Max(value = 10, message = "Grade must be in 1-10 range")
    private Long grade;

    @Min(value = 0, message = "Duration must be a positive number")
    @NotNull(message = "Duration must not be null")
    private Integer duration;

    private String comment;
}
