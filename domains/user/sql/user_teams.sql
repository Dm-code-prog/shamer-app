create table user_teams
(
    user_id    uuid,
    team_id    int,
    created_at timestamp default now(),
    is_owner   boolean   default false,
    primary key (user_id, team_id),
    foreign key (user_id) references users (id) on delete cascade,
    foreign key (team_id) references teams (id) on delete cascade
);

alter table user_teams alter column user_id set not null;
alter table user_teams alter column team_id set not null;