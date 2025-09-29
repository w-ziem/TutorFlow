package com.wziem.backend.services;

import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.wziem.backend.entities.Lesson;
import com.wziem.backend.entities.Profile;
import com.wziem.backend.entities.User;
import com.wziem.backend.repositories.LessonRepository;
import com.wziem.backend.repositories.ProfileRepository;
import com.wziem.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;
    @Value("${app.client-url}")
    private String clientUrl;
    private final ProfileRepository profileRepository;

    public String createSession(Long lessonId, Long studentId) throws StripeException {
        User student = userRepository.findById(studentId).orElseThrow(() -> new EntityNotFoundException("Student not found"));
        Profile studentInfo = profileRepository.findByStudentId(studentId).orElseThrow(() -> new EntityNotFoundException("Student profile not found"));
        Lesson lesson = lessonRepository.findById(lessonId).orElseThrow(() -> new EntityNotFoundException("Lesson not found"));

        BigDecimal hourRate = studentInfo.getHourRate();
        Integer duration = lesson.getDuration();
        Long total = (hourRate.multiply(BigDecimal.valueOf(duration).divideToIntegralValue(BigDecimal.valueOf(60))) //convert from minutes to hours
                .multiply(BigDecimal.valueOf(100)) //stripe handles payment in cents
                .longValue());


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

        return session.getUrl();
    }
}
