package com.wziem.backend.mappers;

import com.wziem.backend.dtos.UserDto;
import com.wziem.backend.entities.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    public UserDto toDto(User user);
}
