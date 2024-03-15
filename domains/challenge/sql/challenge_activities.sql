create table challenge_activities
(
    id                 serial primary key,
    challenge_id       int references challenges (id) ,
    activity_type_id   int references activity_types (id),
    n_units            int,
    -- time in hours
    time               float,
    weight_coefficient float check ( weight_coefficient in (0.8, 1, 1.2)),
    is_extra           boolean
);


alter table challenge_activities alter column activity_type_id set not null ;