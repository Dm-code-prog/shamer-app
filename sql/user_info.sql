create table user_info (
    id serial primary key,
    user_id uuid references users(id),
    age int,
    weight float,
    height float
)