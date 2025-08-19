create table lessons
(
    id         bigserial
        constraint lessons_pk
            primary key,
    topic      varchar(255) not null,
    tutor_id   bigint       not null,
    student_id bigint       not null,
    date       timestamp    not null,
    note       text,
    constraint fk_lessons_student foreign key (student_id) references users(id),
    constraint fk_lessons_tutor foreign key (tutor_id) references users(id)
);

