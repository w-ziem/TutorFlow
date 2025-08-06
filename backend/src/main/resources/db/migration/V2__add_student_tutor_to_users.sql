alter table users
    add tutor_id bigint;

alter table users
    add constraint fk_tutor
        foreign key (tutor_id) references users(id);
