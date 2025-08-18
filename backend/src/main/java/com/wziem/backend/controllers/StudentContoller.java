package com.wziem.backend.controllers;

import com.wziem.backend.dtos.AddStudentRequest;
import com.wziem.backend.dtos.ProfileDto;
import com.wziem.backend.dtos.StudentDto;
import com.wziem.backend.services.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/students")
public class StudentContoller {
    private final StudentService studentService;


    //endpoint to manage students - eg. connect students to tutors

    @PostMapping
    public ResponseEntity<?> addStudentToTutor(@RequestBody AddStudentRequest request){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var tutorId = Long.parseLong(authentication.getPrincipal().toString());
        ProfileDto createdProfile =  studentService.addStudentToTutor(request, tutorId);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdProfile);
    }

    @GetMapping
    public ResponseEntity<?> fetchTutorStudents() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        var tutorId = Long.parseLong(authentication.getPrincipal().toString());
        List<StudentDto> response = studentService.fetchTutorStudents(tutorId);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }



}
