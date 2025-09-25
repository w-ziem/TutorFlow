package com.wziem.backend.dtos;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = WeeklySummaryTutorDto.class, name = "tutor"),
        @JsonSubTypes.Type(value = WeeklySummaryStudentDto.class, name = "student")
})
public abstract class WeeklySummaryDto {
}