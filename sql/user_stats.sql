create table user_stats
(
    id                    serial primary key,
    user_id               uuid       not null references users (id),
    challenge_activity_id int       not null references challenge_activities (id),
    created_at            timestamp not null default now(),
    n_units_actual        int,
    time_actual           int
);