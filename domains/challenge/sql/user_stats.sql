create table user_stats
(
    id                    serial primary key,
    user_id               uuid      not null references users (id),
    challenge_activity_id int       not null references challenge_activities (id),
    challenge_instance_id int       not null references challenge_instances (id),
    created_at            timestamp not null default now(),
    n_units_actual        int,
    time_actual           int
);


create unique index on user_stats (user_id, challenge_activity_id, challenge_instance_id);