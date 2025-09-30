package com.wziem.backend.controllers;

import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import com.wziem.backend.services.LessonService;
import com.wziem.backend.services.StripePaymentGateway;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
public class WebhookController {
    private final StripePaymentGateway stripePaymentGateway;

    @PostMapping("/webhook")
    public void handleWebhook(@RequestHeader Map<String, String> headers, @RequestBody String payload) {
        stripePaymentGateway.handleWebhookEvent(headers, payload);
    }
}
