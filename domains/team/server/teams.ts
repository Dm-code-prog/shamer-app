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
                     ) + 1
              from user_teams ut
              where ut.team_id = t.id)
                                       as
                                          members_count,
             (select sum(total_rp)
              from user_rp
                       left join
                   user_teams ut
                   on
                       user_rp.user_id = ut.user_id
              where ut.team_id = t.id) as rp_total,
             exists(select 1
                    from teams t2
                             left join
                         user_teams ut2
                         on
                             t2.id = ut2.team_id
                    where t2.id = t.id
                        and
                          ut2.user_id = ${user_id}
                       or t2.owner_id = ${user_id})
                                       as
                                          current_user_is_member_or_owner
      from teams t
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

      union

      select u.id,
             u.telegram_username,
             u.emoji
      from users u
      where u.id = (select owner_id
                    from teams
                    where id = ${team_id})
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
             (select sum(total_rp)
              from user_rp
                       left join
                   user_teams ut
                   on
                       user_rp.user_id = ut.user_id
              where ut.team_id = t.id) as rp_total,
             exists(select 1
                    from teams t2
                             left join
                         user_teams ut2
                         on
                             t2.id = ut2.team_id
                    where t2.id = t.id
                        and
                          ut2.user_id = ${user_id}
                       or t2.owner_id = ${user_id})
                                       as
                                          current_user_is_member_or_owner
      from teams t
               left join
           user_teams ut
           on
               t.id = ut.team_id
      where ut.user_id = ${user_id}
         or t.owner_id = ${user_id}
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
                     ) + 1
              from user_teams ut
              where ut.team_id = t.id)
                 as
                 members_count,
             (select sum(total_rp)
              from user_rp
                       left join
                   user_teams ut
                   on
                       user_rp.user_id = ut.user_id
              where ut.team_id = t.id)
                 as
                 rp_total,
             exists(select 1
                    from teams t2
                             left join
                         user_teams ut2
                         on
                             t2.id = ut2.team_id
                    where t2.id = t.id
                        and
                          ut2.user_id = ${user_id}
                       or t2.owner_id = ${user_id})
                 as
                 current_user_is_member_or_owner
      from teams t
      where t.is_public
      limit ${limit}
  `;

  return rows as Team[];
};
