package com.wziem.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttentionItemDto {
    private AttentionType type;
    private String title;
    private String description;
    private String student;
    private String actionText;
    private Map<String, Object> data;

}
