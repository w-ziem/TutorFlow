package com.wziem.backend.dtos;

import com.wziem.backend.entities.Role;
import lombok.Data;

@Data
public class UserDto {
    private String name;
    private String email;
    private Role role;
}
