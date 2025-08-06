create table users
(
    id       bigserial       not null
        constraint users_pk
            primary key,
    name     varchar(255) not null,
    email    varchar(255) not null,
    password varchar(255) not null,
    role     varchar(20)  not null
);
