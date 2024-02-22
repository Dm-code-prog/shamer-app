import { sql } from '@vercel/postgres';

type Team = {
  id?: number;
  owner_id?: string;
  name: string;
  description: string;
  created_at?: Date;
};

type BasicTeamMemberInfo = {
  emoji: string;
};

type TeamInfo = {
  id: number;
  name: string;
  description: string;
  members_count: number;
  rp_total?: number;
  team_members?: BasicTeamMemberInfo[];
  current_user_is_member_or_owner?: boolean;
};

export const createTeam = async ({
  name,
  description,
  owner_id,
}: {
  name: string;
  description: string;
  owner_id: string;
}): Promise<void> => {
  await sql`insert into teams
                (name, description, owner_id)
            values (${name}, ${description}, ${owner_id})
            returning id
  `;
};

export const getFullTeamInfoByID = async (
  id: number,
  current_user_id: string,
): Promise<TeamInfo> => {
  const teamInfo = await sql`select t.id,
                                    t.name,
                                    t.description,
                                    count(ut.user_id) + 1                                          as members_count,
                                    json_agg(json_build_object('emoji', u.emoji))                  as team_members,
                                    bool_or(ut.user_id = ${current_user_id}) or t.owner_id =
                                                                                ${current_user_id} as current_user_is_member_or_owner
                             from teams t
                                      left join user_teams ut on t.id = ut.team_id
                                      left join users u on ut.user_id = u.id or t.owner_id = u.id
                             where t.id = ${id}
                             group by t.id, t.name, t.description, t.owner_id`;
  const rows = teamInfo.rows as TeamInfo[];

  return rows[0];
};

export const getPublicTeamsInfo = async (
  limit: number,
): Promise<TeamInfo[]> => {
  const teamInfo = await sql`select t.id,
                                    t.name,
                                    t.description,
                                    count(ut.user_id) + 1 as members_count
                             from teams t
                                      left join user_teams ut on t.id = ut.team_id
                             group by t.id
                             limit ${limit}`;
  const rows = teamInfo.rows as TeamInfo[];

  return rows as TeamInfo[];
};

export const getUserTeamsInfo = async (
  user_id: string,
): Promise<TeamInfo[]> => {
  const teamInfo = await sql`select t.id,
                                    t.name,
                                    t.description,
                                    count(ut.user_id) + 1 as members_count,
                                    100                   as rp_total
                             from teams t
                                      left join user_teams ut on t.id = ut.team_id
                             where t.owner_id = ${user_id}
                                or ut.user_id = ${user_id}
                             group by t.id`;
  const rows = teamInfo.rows as TeamInfo[];

  return rows as TeamInfo[];
};
