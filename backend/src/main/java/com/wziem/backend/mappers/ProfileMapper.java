package com.wziem.backend.mappers;

import com.wziem.backend.dtos.ProfileDto;
import com.wziem.backend.entities.Profile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    @Mapping(target = "studentName", source = "student.name")
    @Mapping(target = "tutorName", source = "tutor.name")
    public ProfileDto toDto(Profile profile);
}
