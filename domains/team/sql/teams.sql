create table teams
(
    id          serial primary key,
    name        varchar(100) not null,
    description text,
    is_public   boolean      not null default true,
    owner_id    uuid         not null,
    created_at  timestamp    not null default now(),
    foreign key (owner_id) references users (id)
);

create unique index on teams (name) where is_public;

create unique index on teams (name, owner_id);

alter table teams
    add column emoji varchar(100) not null default '🚀';
