package com.wziem.backend.dtos;

import com.wziem.backend.entities.MaterialType;
import lombok.Data;

@Data
public class MaterialDto {
    private MaterialType type;
    private String value;
    private Long lessonId;
}
