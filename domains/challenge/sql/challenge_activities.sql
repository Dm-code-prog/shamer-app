create table challenge_activities
(
    id               serial primary key,
    challenge_id     int references challenges (id),
    activity_type_id int references activity_types (id)
);