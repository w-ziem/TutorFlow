package com.wziem.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;


    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;


    @Column(name = "password")
    private String password;


    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    private Role role;

    //if it's a student he has a tutor
    @ManyToOne
    @JoinColumn(name = "tutor_id")
    private User tutor;

    //if it's a tutor he has a student's list
    @OneToMany(mappedBy = "tutor")
    private List<User> students;

}