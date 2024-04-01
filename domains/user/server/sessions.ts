import 'server-only';
import { sql } from '@vercel/postgres';
import { User } from '#/domains/user/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getSession = async (): Promise<User | null> => {
  const shamerSession = cookies().get('shamer_session');
  if (!shamerSession) {
    return null;
  }
  return getUserBySessionToken(shamerSession.value);
};

export const authorizeUser = async () => {
  const session = await getSession();
  if (!session) {
    redirect('/auth/telegram');
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
                    from user_teams
                    where user_id = u.id) or exists(select 1
                                                    from teams t
                                                    where t.owner_id = u.id) as has_team,
             (select total_rp
              from user_rp
              where user_id = u.id)                                          as rp_total,
             (select league
              from user_rp
              where user_id = u.id)                                          as league
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

  const res = rows[0] as User;
  res.user_info_is_filled = !(!res.weight || !res.height || !res.age);

  return res;
};
