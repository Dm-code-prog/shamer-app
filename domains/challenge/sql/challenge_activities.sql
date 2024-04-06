create table challenge_activities
(
    id                 serial primary key,
    challenge_id       int references challenges (id) on delete cascade,
    activity_type_id   int not null references activity_types (id) on delete cascade,
    n_units            int,
    -- time in hours
    time               float,
    weight_coefficient float check ( weight_coefficient in (0.8, 1, 1.2)),
    is_extra           boolean
);


alter table challenge_activities add column custom_rp int;