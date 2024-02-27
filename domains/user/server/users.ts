import 'server-only';

import { sql } from '@vercel/postgres';

export type User = {
  externalID: string;
  firstName: string;
  lastName: string;
  telegramUsername: string;
};

export type UserProfile = {
  first_name: string;
  last_name: string;
  telegram_username: string;
  externalID: string;
  weight: number;
  height: number;
  age: number;
};

export const saveTelegramUser = async (u: User): Promise<string> => {
  const { rows } =
    await sql`insert into users (ext_id, first_name, last_name, telegram_username)
              values (${u.externalID}, ${u.firstName}, ${u.lastName}, ${u.telegramUsername})
              on conflict (ext_id) do update set first_name        = ${u.firstName},
                                                 last_name         = ${u.lastName},
                                                 telegram_username = ${u.telegramUsername}
              returning id`;

  return rows[0].id;
};

export const getUserProfileByID = async (id: string): Promise<UserProfile> => {
  const res = await sql`select ext_id as externalID,
                               first_name,
                               last_name,
                               telegram_username,
                               weight,
                               height,
                               age
                        from users
                                 left join user_info uf on users.id = uf.user_id
                        where users.id = ${id}`;

  const rows = res.rows as UserProfile[];
  return rows[0];
};
