create table very_not_secure_team_invites
(
    id      serial primary key,
    team_id int         not null,
    token   varchar(50) not null,
    foreign key (team_id) references teams (id)
);