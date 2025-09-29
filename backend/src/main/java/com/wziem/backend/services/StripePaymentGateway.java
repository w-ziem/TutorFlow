package com.wziem.backend.services;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class StripePaymentGateway implements PaymentGateway{

    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;
    private final ProfileRepository profileRepository;

    @Value("${app.client-url}")
    private String clientUrl;

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
}
