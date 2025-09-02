package com.wziem.backend.dtos;

import lombok.Builder;
import lombok.Data;

import java.nio.file.Path;

@Data
@Builder
public class MaterialResourceDto {
    private Path path;
    private String name;
}
