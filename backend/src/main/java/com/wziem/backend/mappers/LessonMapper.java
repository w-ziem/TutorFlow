package com.wziem.backend.mappers;


import com.wziem.backend.dtos.LessonDto;
import com.wziem.backend.entities.Lesson;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface LessonMapper {
    public LessonDto toDto(Lesson lesson);
}
