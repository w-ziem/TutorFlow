package com.wziem.backend.mappers;

import com.wziem.backend.dtos.MaterialDto;
import com.wziem.backend.entities.Material;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MaterialMapper {
    @Mapping(target = "lessonId", source = "lesson.id")
    MaterialDto toDto(Material material);
}
