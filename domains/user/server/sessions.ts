import 'server-only';
import { sql } from '@vercel/postgres';
import { User } from '#/domains/user/types';
import { cookies } from 'next/headers';

export const getSession = async (): Promise<User | null> => {
  const shamerSession = cookies().get('shamer_session');
  if (!shamerSession) {
    return null;
  }
  return getUserBySessionToken(shamerSession.value);
};

export const mustUser = async () => {
  const session = await getSession();
  if (!session) {
    throw new Error('No session');
  }
  return session;
};

export const createSession = async (userID: string): Promise<string> => {
  const { rows } = await sql`insert into sessions (user_id, token)
                           values (${userID}, (select md5(random()::text || clock_timestamp()::text)))
                           returning token`;

  return rows[0].token;
};

export const getUserBySessionToken = async (
  token: string,
): Promise<User | null> => {
  const { rows } = await sql`
      select u.id,
             u.first_name,
             u.last_name,
             u.telegram_username,
             u.created_at,
             u.emoji,
             uf.age,
             uf.weight,
             uf.height,
             exists(select 1
                    from user_info
                    where user_id = u.id)                                    as user_info_is_filled,
             exists(select 1
                    from user_teams
                    where user_id = u.id) or exists(select 1
                                                    from teams t
                                                    where t.owner_id = u.id) as has_team,
             (select total_rp
              from user_rp
              where user_id = u.id)                                          as rp_total
      from sessions s
               left join user_info uf
                         on s.user_id = uf.user_id
               left join users u on s.user_id = u.id
               left join user_teams ut on s.user_id = ut.user_id
      where token = ${token}
        and expires_at > now()
  `;

  if (!rows || rows.length === 0) {
    return null;
  }

  return rows[0] as User;
};
