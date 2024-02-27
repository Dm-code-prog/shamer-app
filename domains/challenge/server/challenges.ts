import 'server-only';

import { sql } from '@vercel/postgres';
import {
  BasicChallengeInfo,
  CompletedChallengeActivities,
  CreateChallengeInfo,
  FullChallengeInfo,
  GetCompletedChallengeActivities,
} from '../types';

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
                                                   cap.time, 'is_extra', cap.is_extra, 'challenge_activity_id', ca.id))
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

export const createChallenge = async (
  info: CreateChallengeInfo,
): Promise<number> => {
  const challenge = await sql`
      insert into challenges (team_id, name, type)
      values (${info.team_id}, ${info.name}, ${info.type})
      returning id as challenge_id;
  `;

  info.properties.map(async (property) => {
    await sql`
        with challenge_activity as (
            insert into challenge_activities (challenge_id, activity_type_id)
                values (${challenge.rows[0].challenge_id}, (select id
                                                            from activity_types
                                                            where name = ${property.type}))
                returning id)
        insert
        into challenge_activities_properties (challenge_activity_id, n_units, time, is_extra)
        values ((select id from challenge_activity), ${property.n_units}, ${property.time}, ${property.is_extra})
    `;
  });

  return challenge.rows[0].challenge_id;
};

export const completeChallengeActivities = async (
  req: CompletedChallengeActivities,
) => {
  req.challenge_activity_ids.map(async (id) => {
    await sql`
        insert into user_stats (user_id, challenge_activity_id)
        values (${req.user_id}, ${id})`;
  });
};

export const getCompletedChallengeActivities = async (
  req: GetCompletedChallengeActivities,
): Promise<CompletedChallengeActivities> => {
  const activities = await sql`
      select challenge_activity_id
      from user_stats
      where user_id = ${req.user_id}
        and challenge_activity_id in (select id
                                      from challenge_activities
                                      where challenge_id = ${req.challenge_id})`;

  return {
    user_id: req.user_id,
    challenge_activity_ids: activities.rows.map(
      (row) => row.challenge_activity_id,
    ),
  };
};
