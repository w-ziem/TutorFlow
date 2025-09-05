package com.wziem.backend.services;

import com.wziem.backend.repositories.ReportRepositiory;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ReportService {
    private final ReportRepositiory reportRepositiory;
}
