import 'server-only';
import { sql } from '@vercel/postgres';
import { UserInfo } from '#/domains/user/types';

export const setUserInfo = async (u: UserInfo): Promise<void> => {
  await sql`insert into user_info (user_id, weight, height, age)
            values (${u.user_id}, ${u.weight}, ${u.height}, ${u.age})
            on conflict (user_id) do update set weight = ${u.weight},
                                                height = ${u.height},
                                                age    = ${u.age}`;
};
