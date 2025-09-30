package com.wziem.backend.controllers;

import com.wziem.backend.dtos.AttentionItemDto;
import com.wziem.backend.dtos.PaymentStatusDto;
import com.wziem.backend.dtos.WeeklySummaryTutorDto;
import com.wziem.backend.entities.Role;
import com.wziem.backend.services.StatService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/stats")
@AllArgsConstructor
@Slf4j
public class StatController {
    private final StatService statService;

    @GetMapping("/weekly")
    public ResponseEntity<Object> getWeeklyStats() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();
        String roleName = authentication.getAuthorities().iterator().next().getAuthority();
        Role role = Role.valueOf(roleName.replace("ROLE_", ""));
        Object data = statService.getStats(userId, role, "weekly");

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(data);
    }

    @GetMapping("/attention")
    public ResponseEntity<?> getAttentionRequired() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();
        List<AttentionItemDto> data = statService.getAttentionSensitiveStats(userId);

        return ResponseEntity.ok().body(data);
    }

    @GetMapping("/payment/{id}")
    public ResponseEntity<?> getPaymentStatus(@PathVariable(value = "id") Long studentId) {
        PaymentStatusDto response = statService.getPaymentStatus(studentId);

        return ResponseEntity.ok().body(response);
    }


}
