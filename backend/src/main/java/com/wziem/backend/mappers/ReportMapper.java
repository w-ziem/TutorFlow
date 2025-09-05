package com.wziem.backend.mappers;

import com.wziem.backend.dtos.ReportDto;
import com.wziem.backend.entities.Report;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {LessonMapper.class})
public interface ReportMapper {
    //TODO: toSummaryDto

    @Mapping(source = "student.name", target = "studentName")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "response", target = "response")
    @Mapping(source = "lessons", target = "lessons")
    public ReportDto toDto(Report report);
}
