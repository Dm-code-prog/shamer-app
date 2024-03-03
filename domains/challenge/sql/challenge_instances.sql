create table challenge_instances
(
    id           serial primary key,
    challenge_id integer   not null,
    start_time   timestamp not null,
    end_time     timestamp not null
);