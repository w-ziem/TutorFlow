create table profiles
(
    id           bigserial primary key,
    student_id   bigint not null,
    tutor_id     bigint not null,
    rate         numeric(10,2) not null,
    lesson_count integer not null,
    level        varchar(255) not null,
    constraint fk_profiles_student foreign key (student_id) references users(id),
    constraint fk_profiles_tutor foreign key (tutor_id) references users(id),
    constraint unique_student_tutor unique (student_id, tutor_id)
);
