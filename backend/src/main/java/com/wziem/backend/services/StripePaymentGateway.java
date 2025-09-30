package com.wziem.backend.services;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionCreateParams;
import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.Profile;
import com.wziem.backend.entities.User;
import com.wziem.backend.exceptions.PaymentException;
import com.wziem.backend.repositories.LessonRepository;
import com.wziem.backend.repositories.ProfileRepository;
import com.wziem.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class StripePaymentGateway implements PaymentGateway{
    private final LessonService lessonService;

    @Value("${app.client-url}")
    private String clientUrl;

    @Value("${stripe.webhook-secret}")
    private String webhookSecretKey;

    @Override
    public PaymentSession createPaymentSession(Lesson lesson, BigDecimal hourRate)  {
        Integer duration = lesson.getDuration();
        Long total = (hourRate.multiply(BigDecimal.valueOf(duration).divideToIntegralValue(BigDecimal.valueOf(60))) //convert from minutes to hours
                .multiply(BigDecimal.valueOf(100)) //stripe handles payment in cents
                .longValue());


        try {
            SessionCreateParams params =
                SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.PAYMENT)
                    .setSuccessUrl(clientUrl + "/payment-success")
                    .setCancelUrl(clientUrl + "/payment-cancel")
                    .putMetadata("lessonId", lesson.getId().toString())
                    .addLineItem(
                        SessionCreateParams.LineItem.builder()
                            .setQuantity(1L)
                            .setPriceData(
                                SessionCreateParams.LineItem.PriceData.builder()
                                    .setCurrency("pln")
                                    .setUnitAmount(total)
                                    .setProductData(
                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                            .setName("Lekcja z dnia " + lesson.getDate().toLocalDate().toString())
                                            .setDescription("Uczeń: " + lesson.getStudent().getName())
                                            .build())
                                .build())
                    .build())
            .build();

            Session session = Session.create(params);
            return new PaymentSession(session.getUrl());
        } catch (StripeException e) {
            throw new PaymentException("Error creating a stripe checkout session");
        }
    }


    public void handleWebhookEvent(Map<String, String> headers, String payload){
        try {
            String signature = headers.get("stripe-signature");
            var event = Webhook.constructEvent(payload, signature, webhookSecretKey);
            var stripeObject = event.getDataObjectDeserializer().getObject().orElseThrow(() -> new PaymentException("Could not deserialize event, check api and sdk version"));

            switch (event.getType()) {
                case "payment_intent.succeeded" -> {
                    PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
                    assert paymentIntent != null;
                    lessonService.handlePaymentSuccess(paymentIntent.getMetadata().get("lesson_id"));
                }
                case "payment_intent.payment_failed" -> {
                    PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
                    assert paymentIntent != null;
                    log.error("Payment failed for lesson: {}", paymentIntent.getMetadata().get("lesson_id"));
                }
            }

        } catch (SignatureVerificationException e) {
            throw new PaymentException("invalid signature");
        }
    }
}
