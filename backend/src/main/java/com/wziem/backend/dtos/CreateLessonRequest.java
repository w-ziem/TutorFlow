package com.wziem.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateLessonRequest {
    @NotNull
    @NotEmpty
    private String topic;
    @NotNull
    @NotEmpty
    @Email
    private String studentEmail;

    @NotNull
    @NotEmpty
    private String whiteboardLink;
}
