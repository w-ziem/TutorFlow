package com.wziem.backend.controllers;

import com.wziem.backend.dtos.AddStudentRequest;
import com.wziem.backend.dtos.ProfileDto;
import com.wziem.backend.services.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class StudentContoller {
    private final StudentService studentService;


    //endpoint to manage students - eg. connect students to tutors

    @PostMapping("/students")
    public ResponseEntity<?> addStudentToTutor(@RequestBody AddStudentRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var tutorId = Long.parseLong(authentication.getPrincipal().toString());
        ProfileDto createdProfile =  studentService.addStudentToTutor(request, tutorId);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdProfile);
    }




}
