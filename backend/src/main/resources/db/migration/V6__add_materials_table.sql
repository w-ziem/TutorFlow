create table materials
(
    id        bigserial
        constraint materials_pk
            primary key,
    lesson_id bigint      not null
        constraint materials_lessons_id_fk
            references lessons,
    type      varchar(20) not null,
    value     text        not null
);

