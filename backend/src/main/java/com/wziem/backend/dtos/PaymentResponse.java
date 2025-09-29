package com.wziem.backend.dtos;

import lombok.Data;

@Data
public class PaymentResponse {
    private String checkoutLink;
    private Long lessonId;

    public PaymentResponse(String checkoutLink, Long lessonId) {
        this.checkoutLink = checkoutLink;
        this.lessonId = lessonId;
    }
}
