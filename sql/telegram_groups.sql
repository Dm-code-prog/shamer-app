create table telegram_groups
(
    id                serial primary key,
    team_id          int not null,
    telegram_group_id int not null,
    foreign key (team_id) references teams (id)
);