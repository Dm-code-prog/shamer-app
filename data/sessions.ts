import { sql } from '@vercel/postgres';

export const createSession = async (userID: string): Promise<string> => {
  const { rows } = await sql`insert into sessions (user_id, token)
                           values (${userID}, (select md5(random()::text || clock_timestamp()::text)))
                           returning token`;

  return rows[0].token;
};

export const getSession = async (token: string): Promise<string> => {
  const { rows } = await sql`select user_id
                           from sessions
                           where token = ${token}
                             and expires_at > now()
  `;

  if (!rows || rows.length === 0) {
    return '';
  }

  return rows[0].user_id;
};
