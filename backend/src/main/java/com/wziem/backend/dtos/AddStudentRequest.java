package com.wziem.backend.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import org.hibernate.validator.constraints.NotBlank;

import java.math.BigDecimal;

@Data
public class AddStudentRequest {

    @Email(message = "Must be a valid email")
    private String email;
    @NotBlank(message = "Name must not be blank")
    private String communicationLink;
    @PositiveOrZero(message = "Hourly rate must be a positive number")
    private BigDecimal hourlyRate;
    @NotNull(message = "Education level must not be null")
    private String educationLevel;

}
