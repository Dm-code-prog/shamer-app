create type challenge_type as enum (
    'personal-daily',
    'personal-weekly',
    'personal-monthly',
    'personal-one-time'
        'group-weekly',
    'group-monthly',
    'group-one-time',
    'group-limited'
    );


create table challenges
(
    id          serial primary key,
    team_id     int references teams (id),
    name        varchar(255)   not null,
    description text           not null,
    type        challenge_type not null,
    start_date  date,
    end_date    date,
    created_at  timestamp      not null default now(),
    updated_at  timestamp      not null default now()
)



