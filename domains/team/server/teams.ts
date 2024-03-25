import { sql } from '@vercel/postgres';
import { CreateTeamRequest, Team } from '#/domains/team/types';
import { User } from '#/domains/user/types';

export const createTeam = async ({
  name,
  description,
  is_public,
  emoji,
  user_id,
}: CreateTeamRequest & { user_id: string }): Promise<void> => {
  const { rows } = await sql`
      insert into teams (name, description, is_public, owner_id, emoji)
      values (${name}, ${description}, ${is_public}, ${user_id}, ${emoji})
      returning id
  `;

  await sql`
      insert into user_teams (team_id, user_id)
      values (${rows[0].id}, ${user_id})
  `;

  return rows[0].id;
};

export const joinTeam = async (
  team_id: number,
  user_id: string,
): Promise<void> => {
  const { rows } = await sql`
      insert into user_teams (team_id, user_id)
      values (${team_id}, ${user_id})
  `;
  return rows[0].id;
};

export const getTeam = async (
  team_id: number,
  user_id: string,
): Promise<Team | null> => {
  const { rows } = await sql`
      select t.id,
             t.name,
             t.description,
             t.created_at,
             t.is_public,
             t.owner_id,
             t.emoji,
             (select count(*
                     )
              from user_teams ut
              where ut.team_id = t.id)
                          as
                             members_count,
             trp.total_rp as rp_total,
             exists(select 1
                    from user_teams
                    where user_id = ${user_id}
                      and team_id = t.id) or t.owner_id = ${user_id}
                          as
                             current_user_is_member_or_owner
      from teams t
               left join team_rp trp on t.id = trp.id
      where t.id = ${team_id}
  `;

  if (!rows || rows.length === 0) {
    return null;
  }

  return rows[0] as Team;
};

export const getTeamMembers = async (team_id: number): Promise<User[]> => {
  const { rows } = await sql`
      select u.id,
             u.telegram_username,
             u.emoji
      from users u
               left join
           user_teams ut
           on
               u.id = ut.user_id
      where ut.team_id = ${team_id}
  `;

  return rows as User[];
};

export const getMyTeams = async (user_id: string): Promise<Team[]> => {
  const { rows } = await sql`
      select t.id,
             t.name,
             t.description,
             t.created_at,
             t.is_public,
             t.owner_id,
             t.emoji,
             (select count(*
                     ) + 1
              from user_teams ut
              where ut.team_id = t.id)
                                       as
                                          members_count,
             coalesce(trp.total_rp, 0) as rp_total,
             exists(select 1
                    from user_teams
                    where user_id = ${user_id}
                      and team_id = t.id) or t.owner_id = ${user_id}
                                       as
                                          current_user_is_member_or_owner
      from teams t
               left join
           user_teams ut
           on
               t.id = ut.team_id
               left join team_rp trp on t.id = trp.id
      where ut.user_id = ${user_id}
         or t.owner_id = ${user_id}
      order by coalesce(trp.total_rp, 0) desc
  `;

  return rows as Team[];
};

export const getPublicTeams = async (
  user_id: string,
  limit: number,
): Promise<Team[]> => {
  const { rows } = await sql`
      select t.id,
             t.name,
             t.description,
             t.created_at,
             t.is_public,
             t.owner_id,
             t.emoji,
             (select count(*
                     )
              from user_teams ut
              where ut.team_id = t.id)
                                       as
                 members_count,
             coalesce(trp.total_rp, 0) as
                 rp_total,
             exists(select 1 from user_teams where user_id = ${user_id} and team_id = t.id) or
             t.owner_id = ${user_id}   as
                 current_user_is_member_or_owner
      from teams t
               left join team_rp trp on t.id = trp.id
      where t.is_public
      order by coalesce(trp.total_rp, 0) desc

      limit ${limit}
  `;

  return rows as Team[];
};
