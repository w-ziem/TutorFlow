ALTER TABLE lessons
    ADD COLUMN grade BIGINT;

ALTER TABLE lessons
    RENAME COLUMN ispaid TO is_paid;

ALTER TABLE lessons
    RENAME COLUMN isdone TO is_completed;
