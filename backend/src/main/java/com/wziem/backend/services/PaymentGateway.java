package com.wziem.backend.services;

import com.wziem.backend.entities.Lesson;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;

public interface PaymentGateway {
    PaymentSession createPaymentSession(Lesson lesson, BigDecimal houtRate);
}
