create extension if not exists "uuid-ossp";

create table users
(
    id                uuid primary key default uuid_generate_v4() not null,
    ext_id            varchar(255)                                not null,
    first_name        varchar(255)                                not null,
    last_name         varchar(255)                                not null,
    telegram_username varchar(255)                                not null
);

create unique index users_ext_id_uindex
    on users (ext_id);

alter table users
    add column created_at timestamp default now() not null;

alter table users
add column emoji varchar(255) not null default '👤';
