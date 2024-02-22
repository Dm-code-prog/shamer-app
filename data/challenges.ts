import { sql } from '@vercel/postgres';

type BasicChallengeInfo = {
  id: number;
  name: string;
  activity_types: string[];
};

type Property = {
  type: string;
  unit: string;
  n_units: number;
  time: number;
  is_extra: boolean;
};

type FullChallengeInfo = {
  id: number;
  name: string;
  owner_nickname: string;
  activity_properties: Property[];
};

export const getTeamChallenges = async (id: number) => {
  const challengeInfo = await sql`select c.id,
                                         c.name,
                                         json_agg(at.name) as activity_types
                                  from challenges c
                                           left join challenge_activities ca on c.id = ca.challenge_id
                                           left join activity_types at on ca.activity_type_id = at.id
                                  where c.team_id = ${id}
                                  group by c.id, c.name`;
  return challengeInfo.rows as BasicChallengeInfo[];
};

export const getFullChallengeInfoByID = async (id: number) => {
  const info = await sql`
      with challenges as (select c.id,
                                 c.name,
                                 u.telegram_username               as owner_nickname,
                                 json_agg(
                                 json_build_object('type', at.name, 'unit', at.unit, 'n_units', cap.n_units, 'time',
                                                   cap.time, 'is_extra', cap.is_extra))
                                 filter (where cap.id is not null) as activity_properties
                          from challenges c
                                   left join teams t on c.team_id = t.id
                                   left join users u on t.owner_id = u.id
                                   left join challenge_activities ca on c.id = ca.challenge_id
                                   left join activity_types at on ca.activity_type_id = at.id
                                   left join challenge_activities_properties cap on ca.id = cap.challenge_activity_id
                          group by c.id, c.name, u.telegram_username)

      select *
      from challenges
      where id = ${id};
  `;

  return info.rows[0] as FullChallengeInfo;
};
