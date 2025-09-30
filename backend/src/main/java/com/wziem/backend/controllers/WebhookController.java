package com.wziem.backend.controllers;

import com.wziem.backend.dtos.PaymentStatusObject;
import com.wziem.backend.services.LessonService;
import com.wziem.backend.services.StripePaymentGateway;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
public class WebhookController {
    private final StripePaymentGateway stripePaymentGateway;
    private final LessonService lessonService;

    @PostMapping("/webhook")
    public void handleWebhook(@RequestHeader Map<String, String> headers, @RequestBody String payload) {
        PaymentStatusObject data = stripePaymentGateway.handleWebhookEvent(headers, payload);
        lessonService.handlePaymentStatus(data);
    }
}
