create table sessions
(
    id         serial primary key,
    user_id    uuid references users (id) not null,
    token      varchar(255)               not null,
    expires_at timestamp                  not null default now() + interval '90 days'
);