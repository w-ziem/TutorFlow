package com.wziem.backend.mappers;


import com.wziem.backend.dtos.LessonDto;
import com.wziem.backend.entities.Lesson;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface LessonMapper {
    @Mapping(source = "student.name", target = "studentName")
    @Mapping(source = "tutor.name", target = "tutorName")
    public LessonDto toDto(Lesson lesson);
}
