package com.wziem.backend.services;

import com.wziem.backend.dtos.AddStudentRequest;
import com.wziem.backend.dtos.ProfileDto;
import com.wziem.backend.dtos.StudentDto;
import com.wziem.backend.entities.Profile;
import com.wziem.backend.entities.User;
import com.wziem.backend.mappers.ProfileMapper;
import com.wziem.backend.repositories.ProfileRepository;
import com.wziem.backend.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentService {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;

    public ProfileDto addStudentToTutor(AddStudentRequest request, long tutorId) {
        User student = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException("Student not found"));
        User tutor = userRepository.findById(tutorId).orElseThrow(() -> new UsernameNotFoundException("Tutor not found"));
        student.setTutor(tutor);
        tutor.getStudents().add(student);
        Profile profile = createProfileWithExistingUsers(student, tutor, request);

        return profileMapper.toDto(profile);
    }



    private Profile createProfileWithExistingUsers(User student, User tutor, AddStudentRequest details) {
        Profile profile = new Profile();
        profile.setStudent(student);
        profile.setTutor(tutor);
        profile.setHourRate(details.getHourlyRate());
        profile.setLessonCount(0);
        profile.setEducationLevel(details.getEducationLevel());
        profile.setCommunicationLink(details.getCommunicationLink());

        return profileRepository.save(profile); //tutor and user are saved in the same transaction
    }

    public List<StudentDto> fetchTutorStudents(long tutorId) {
        List<Profile> students = profileRepository.findAllByTutorId(tutorId);
        return students.stream().map(profileMapper::toStudentDto).toList();
    }

    public StudentDto getStudent(Long studentId) {
        Profile studentInfo = profileRepository.findByStudentId(studentId).orElseThrow(() -> new EntityNotFoundException("Student not found"));
        return profileMapper.toStudentDto(studentInfo);
    }
}
