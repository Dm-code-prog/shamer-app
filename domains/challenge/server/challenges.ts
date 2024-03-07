import 'server-only';

import { sql } from '@vercel/postgres';
import {
  Challenge,
  CompleteChallengeActivityRequest,
} from '#/domains/challenge/types';

export const getTeamChallenges = async (
  team_id: number,
  user_id: string,
): Promise<Challenge[]> => {
  const challenges = await sql`
      select c.id,
             c.name,
             c.type,
             c.created_at,
             ci.start_time,
             ci.end_time,
             json_agg(
                     json_build_object('type', at.name, 'unit', at.unit, 'n_units', ca.n_units, 'time', ca.time,
                                       'is_extra', ca.is_extra)) as activities,
             us.user_id = ${user_id}                             as is_completed
      from challenges c
               left join challenge_instances ci
                         on c.id = ci.challenge_id
                             and ci.start_time < now() and ci.end_time > now()
               left join user_stats us on ci.id = us.challenge_instance_id and us.user_id = ${user_id}
               left join challenge_activities ca on c.id = ca.challenge_id
               left join activity_types at on ca.activity_type_id = at.id
      where c.team_id = ${team_id}
      group by c.id, ci.start_time, ci.end_time, us.user_id
  `;

  return challenges.rows as Challenge[];
};

export const getUserChallenges = async (user_id: string, limit = 5) => {
  const challenges = await sql`
      select c.id,
             c.name,
             c.type,
             c.created_at,
             ci.start_time,
             ci.end_time,
             t.id                    as team_id,
             t.name                  as team_name,
             json_agg(
                     json_build_object('type', at.name, 'unit', at.unit, 'n_units', ca.n_units, 'time', ca.time,
                                       'is_extra', ca.is_extra, 'is_completed',
                                       exists((select 1 from user_stats us where us.challenge_instance_id = ci.id)))
             )                       as activities,
             us.user_id = ${user_id} as is_completed
      from challenges c
               left join teams t on c.team_id = t.id
               left join challenge_instances ci
                         on c.id = ci.challenge_id
                             and ci.start_time < now() and ci.end_time > now()
               left join user_stats us on ci.id = us.challenge_instance_id
               left join challenge_activities ca on c.id = ca.challenge_id
               left join activity_types at on ca.activity_type_id = at.id
      group by c.id, ci.start_time, ci.end_time, t.id, t.name, us.user_id
      order by ci.end_time desc
      limit ${limit}
  `;

  return challenges.rows as Challenge[];
};

export const getChallenge = async (challenge_id: number, user_id: string) => {
  const challenge = await sql`
      select c.id,
             c.name,
             c.type,
             c.created_at,
             t.name                  as team_name,
             t.id                    as team_id,
             ci.start_time,
             ci.end_time,
             ci.id                   as instance_id,
             json_agg(
                     json_build_object(
                             'id', ca.id, 'met', at.met,
                             'type', at.name, 'units', at.unit, 'n_units', ca.n_units, 'time', ca.time,
                             'is_extra', ca.is_extra, 'is_completed', exists((select 1
                                                                              from user_stats us
                                                                              where us.challenge_instance_id = ci.id))
                     ))              as activities,
             us.user_id = ${user_id} as is_completed,
             u.telegram_username     as owner
      from challenges c
               left join challenge_instances ci
                         on c.id = ci.challenge_id
                             and ci.start_time < now() and ci.end_time > now()
               left join user_stats us on ci.id = us.challenge_instance_id and us.user_id = ${user_id}
               left join challenge_activities ca on c.id = ca.challenge_id
               left join activity_types at on ca.activity_type_id = at.id
               left join teams t on c.team_id = t.id
               left join users u on t.owner_id = u.id
      where c.id = ${challenge_id}
      group by c.id, ci.start_time, ci.end_time, u.telegram_username, t.id, t.name, ci.id, us.user_id
  `;

  return challenge.rows[0] as Challenge;
};

export const createChallenge = async (
  info: Omit<Challenge, 'id' | 'is_completed' | 'team_name' | 'owner'>,
): Promise<number> => {
  const challenge = await sql`
      insert into challenges (team_id, name, type)
      values (${info.team_id}, ${info.name}, ${info.type})
      returning id
  `;

  const id = challenge.rows[0].id;

  await populateChallengeInstances(id, info.type);

  await Promise.all(
    info.activities.map(
      (activity) =>
        sql`
            insert into challenge_activities (challenge_id, activity_type_id, n_units, time, is_extra)
            values (${id}, (select id from activity_types where name = ${activity.type}), ${activity.n_units},
                    ${activity.time}, ${activity.is_extra})
        `,
    ),
  );

  return challenge.rows[0].id;
};

export const completeActivities = async (
  info: CompleteChallengeActivityRequest & { user_id: string },
) => {
  await Promise.all(
    info.activity_ids.map(
      (activity_id) =>
        sql`
            insert into user_stats (user_id, challenge_instance_id, challenge_activity_id)
            values (${info.user_id}, ${info.challenge_instance_id}, ${activity_id})
        `,
    ),
  );
};

// challange starts at 00:00 Frankfurt time
// group-dayly challenge ends at 23:59 Frankfurt time on the same day
// group-weekly challenge ends at 23:59 Frankfurt time when the week ends
// populate function starts at the current day and populates the challenge instances for the next 30 days, or 4 weeks in case of weekly challenges
export const populateChallengeInstances = async (
  challenge_id: number,
  type: string,
): Promise<void> => {
  if (type === 'group-daily') {
    await sql`
        INSERT INTO challenge_instances (challenge_id, start_time, end_time)
        SELECT ${challenge_id},
               series                                             start_time,
               series + INTERVAL '1 day' - INTERVAL '1 second' AS end_time
        FROM generate_series(
                     DATE_TRUNC('day', NOW() AT TIME ZONE 'Europe/Berlin'),
                     DATE_TRUNC('day', NOW() AT TIME ZONE 'Europe/Berlin') + INTERVAL '30 days',
                     '1 day'
             ) AS series;
    `;
  }

  if (type === 'group-weekly') {
    await sql`
        INSERT INTO challenge_instances (challenge_id, start_time, end_time)
        SELECT ${challenge_id},
               series                                           AS start_time,
               series + INTERVAL '1 week' - INTERVAL '1 second' AS end_time
        FROM generate_series(
                     DATE_TRUNC('week', NOW() AT TIME ZONE 'Europe/Berlin'),
                     DATE_TRUNC('week', NOW() AT TIME ZONE 'Europe/Berlin') + INTERVAL '4 weeks',
                     '1 week'
             ) AS series;
    
    `;
  }
};
