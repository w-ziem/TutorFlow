package com.wziem.backend.dtos;

import com.wziem.backend.entities.MaterialType;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MaterialRequest {
    private String value;
    @NotNull
    private MaterialType type;

    private String name;
}
