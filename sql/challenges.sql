create type challenge_type as enum (
    'personal-daily',
    'personal-weekly',
    'personal-monthly',
    'personal-one-time'
        'group-weekly',
    'group-monthly',
    'group-one-time'
    );

create table challenges
(
    id          serial primary key,
    group_id    int references groups (id),
    name        varchar(255)   not null,
    description text           not null,
    type        challenge_type not null,
    start_date  date           not null,
    end_date    date           not null,
    created_at  timestamp      not null default now(),
    updated_at  timestamp      not null default now()
);