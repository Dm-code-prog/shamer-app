create table user_info
(
    id      serial primary key,
    user_id uuid references users (id),
    age     int,
    weight  float,
    height  float
);


create unique index
    on user_info (user_id);