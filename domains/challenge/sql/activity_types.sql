create table activity_types
(
    id                 serial primary key,
    name               varchar(255) not null,
    description        text,
    created_at         timestamp    not null default now(),
    unit               unit_type    not null,
    met                int          not null,
    base_intense_level int          not null,
    base_weight        int          not null default 1
);


alter table activity_types
    drop constraint activity_types_base_weight_check;

alter type unit_type add value 'pools';

alter type unit_type add value 'min';