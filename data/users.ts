import 'server-only';

import { sql } from '@vercel/postgres';

type User = {
  externalID: string;
  firstName: string;
  lastName: string;
  telegramUsername: string;
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
