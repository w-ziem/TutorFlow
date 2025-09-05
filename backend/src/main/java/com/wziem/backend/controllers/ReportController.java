package com.wziem.backend.controllers;

import com.wziem.backend.dtos.ReportDto;
import com.wziem.backend.services.ReportService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class ReportController {


    private final ReportService reportService;



    @GetMapping("/students/{id}/report")
    public ResponseEntity<?> generateReport(@PathVariable(value = "id") Long studentId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Long userId = (Long) authentication.getPrincipal(); //tutorId

        ReportDto report = reportService.generateReport(studentId, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(report);
    }
}
