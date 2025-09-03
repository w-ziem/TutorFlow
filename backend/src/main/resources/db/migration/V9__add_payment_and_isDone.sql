alter table lessons
    add column isPaid boolean not null default false,
    add column isDone boolean not null default false;
