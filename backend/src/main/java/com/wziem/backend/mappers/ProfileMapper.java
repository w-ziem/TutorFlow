package com.wziem.backend.mappers;

import com.wziem.backend.dtos.ProfileDto;
import com.wziem.backend.dtos.StudentDto;
import com.wziem.backend.entities.Profile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    @Mapping(target = "studentName", source = "student.name")
    @Mapping(target = "tutorName", source = "tutor.name")
    public ProfileDto toDto(Profile profile);

    @Mapping(target = "email", source = "student.email")
    @Mapping(target = "name", source = "student.name")
    @Mapping(target = "hourRate", source = "hourRate")
    @Mapping(target = "id", source = "student.id")
    public StudentDto toStudentDto(Profile profile);

}
