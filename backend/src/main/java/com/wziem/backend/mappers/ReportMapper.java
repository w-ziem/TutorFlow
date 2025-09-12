package com.wziem.backend.mappers;

import com.wziem.backend.dtos.ReportDto;
import com.wziem.backend.dtos.ReportSummary;
import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.Report;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {LessonMapper.class})
public interface ReportMapper {

    @Mapping(source = "student.name", target = "studentName")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "id", target = "id")
    public ReportSummary toSummaryDto(Report report);

    @Mapping(source = "student.name", target = "studentName")
    @Mapping(source = "createdDate", target = "createdDate")
    @Mapping(source = "response", target = "response")
    @Mapping(source = "id", target = "id")
    @Mapping(expression = "java(extractLessonNames(report))", target = "lessonNames")
    public ReportDto toDto(Report report);

    default List<String> extractLessonNames(Report report) {
        System.out.println(report.toString());
        return report.getLessons().stream()
                .map(Lesson::getTopic)
                .collect(Collectors.toList());
    }

}
