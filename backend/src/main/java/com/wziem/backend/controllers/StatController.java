package com.wziem.backend.controllers;

import com.wziem.backend.dtos.WeeklySummaryDto;
import com.wziem.backend.services.StatService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/stats")
@AllArgsConstructor
public class StatController {
    private final StatService statService;

    @GetMapping("/weekly")
    public ResponseEntity<?> getWeeklyStats() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal();
        WeeklySummaryDto data = statService.getStats(userId, "weekly");

        return ResponseEntity.ok().body(data);
    }
}
