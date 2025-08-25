package com.wziem.backend.mappers;

import com.wziem.backend.dtos.MaterialDto;
import com.wziem.backend.entities.Material;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MaterialMapper {
    MaterialDto toDto(Material material);
}
