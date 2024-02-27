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
    id         serial primary key,
    team_id    int references teams (id),
    name       varchar(255)   not null,
    type       challenge_type not null,
    created_at timestamp      not null default now(),
    updated_at timestamp      not null default now()
);

alter type challenge_type add value 'group-daily';


alter table challenges alter column  team_id set not null;
