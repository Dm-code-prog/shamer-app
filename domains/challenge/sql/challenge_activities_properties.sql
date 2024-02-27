create table challenge_activities_properties
(
    id                    serial primary key,
    challenge_activity_id int references challenge_activities (id),
    n_units               int,
    -- time in hours
    time                  float,
    weight_coefficient    float check ( weight_coefficient in (0.8, 1, 1.2) )
);


alter table challenge_activities_properties add column is_extra bool default false;
