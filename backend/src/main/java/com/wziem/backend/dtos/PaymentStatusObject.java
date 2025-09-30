package com.wziem.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PaymentStatusObject {
    private PaymentStatus status;
    private Long lessonId;
}
