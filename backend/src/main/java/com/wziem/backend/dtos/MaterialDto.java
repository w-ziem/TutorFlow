package com.wziem.backend.dtos;

import com.wziem.backend.entities.MaterialType;
import lombok.Data;

@Data
public class MaterialDto {
    private Long id;
    private MaterialType type;
    private String name;
    private String value;
    private Long lessonId;
}
