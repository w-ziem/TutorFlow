alter table lessons
    drop column is_used,
    add column report_id bigint,
    add constraint fk_lessons_report foreign key (report_id) references reports(id);
