import { sql } from '@vercel/postgres';

export type UserInfo = {
  user_id: string;
  weight: number;
  height: number;
  age: number;
};

export const getUserInfo = async (user_id: string): Promise<UserInfo> => {
  const { rows } = await sql`select *
                           from user_info
                           where user_id = ${user_id}`;
  if (!rows || rows.length === 0) {
    return { user_id, weight: 0, height: 0, age: 0 };
  }
  return {
    user_id,
    weight: rows[0].weight,
    height: rows[0].height,
    age: rows[0].age,
  };
};

export const setUserInfo = async (u: UserInfo): Promise<void> => {
  await sql`insert into user_info (user_id, weight, height, age)
            values (${u.user_id}, ${u.weight}, ${u.height}, ${u.age})
            on conflict (user_id) do update set weight = ${u.weight},
                                                height = ${u.height},
                                                age    = ${u.age}`;
};
