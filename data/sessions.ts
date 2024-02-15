import { sql } from '@vercel/postgres';

export const createSession = async (userID: string): Promise<string> => {
  const { rows } = await sql`insert into sessions (user_id, token)
                           values (${userID}, (select md5(random()::text || clock_timestamp()::text)))
                           returning token`;

  return rows[0].token;
};

export type UserData = {
  user_id: string;
  user_info_is_filled: boolean;
};

export const getUserDataBySessionToken = async (
  token: string,
): Promise<UserData> => {
  const { rows } = await sql`
      select s.user_id                                                               as user_id,
             (select not (uf.weight is null or uf.height is null or uf.age is null)) as user_info_is_filled
      from sessions s
               left join user_info uf
                    on s.user_id = uf.user_id
      where token = ${token}
        and expires_at > now()
  `;

  if (!rows || rows.length === 0) {
    return { user_id: '', user_info_is_filled: false };
  }

  return {
    user_id: rows[0].user_id,
    user_info_is_filled: rows[0].user_info_is_filled,
  };
};
