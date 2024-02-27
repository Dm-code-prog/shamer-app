create table very_not_secure_team_invites
(
    id        serial primary key,
    team_id   int         not null,
    token     varchar(50) not null,
    is_active boolean default true,
    foreign key (team_id) references teams (id)
);