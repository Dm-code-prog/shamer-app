create table activity_types (
    id serial primary key,
    name varchar(255) not null,
    description text,
    created_at timestamp not null default now()
);