create table reports
(
    id           bigserial primary key,
    student_id   bigint not null,
    lesson_id    bigint not null,
    response     text not null,
    created_date timestamp,
    constraint fk_reports_student foreign key (student_id) references users(id),
    constraint fk_reports_lessons foreign key (lesson_id) references lessons(id)
);
