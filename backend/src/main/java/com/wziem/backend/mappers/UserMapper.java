package com.wziem.backend.mappers;

import com.wziem.backend.dtos.StudentDto;
import com.wziem.backend.dtos.UserDto;
import com.wziem.backend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {
    public UserDto toDto(User user);
}
