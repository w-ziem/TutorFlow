package com.wziem.backend.dtos;

import jakarta.validation.constraints.;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

@Data
public class FinishLessonRequest {
    @Min(value = 1, message = "Grade must be in 1-10 range")
    @Max(value = 10, message = "Grade must be in 1-10 range")
    private Long grade;


    private String comment;
}
