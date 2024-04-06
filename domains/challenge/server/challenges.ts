import 'server-only';

import { sql } from '@vercel/postgres';
import {
  Challenge,
  CompleteChallengeActivityRequest,
  UserAllTimeActivityResult,
} from '#/domains/challenge/types';

// performs authZ check
export const canIViewChallenge = async (
  challenge_id: number,
  user_id: string,
): Promise<boolean> => {
  const res = await sql`
      select exists(select 1
                    from challenges c
                             left join teams t on c.team_id = t.id
                             left join user_teams ut on t.id = ut.team_id
                    where c.id = ${challenge_id}
                      and (t.owner_id = ${user_id} or ut.user_id = ${user_id}))
  `;

  return res.rows[0].exists;
};

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
                                       'is_extra', ca.is_extra, 'is_completed',
                                       exists((select 1 from user_stats us where us.challenge_instance_id = ci.id)))) as activities,
             us.user_id = ${user_id}                                                                                  as is_completed
      from challenges c
               left join challenge_instances ci
                         on c.id = ci.challenge_id
                             and ci.start_time < now() and ci.end_time > now()
               left join user_stats us on ci.id = us.challenge_instance_id and us.user_id = ${user_id}
               left join challenge_activities ca on c.id = ca.challenge_id
               left join activity_types at on ca.activity_type_id = at.id
      where c.team_id = ${team_id}
      group by c.id, ci.start_time, ci.end_time, us.user_id
      order by is_completed desc, ci.end_time desc
  
  `;

  const res = challenges.rows as Challenge[];

  res.forEach((r) => {
    let completed = true;
    r.activities.forEach((a) => {
      if (!a.is_completed) {
        completed = false;
      }
    });

    r.is_completed = completed;
  });

  return res;
};

export const getUserChallenges = async (
  user_id: string,
  limit = 5,
): Promise<Challenge[]> => {
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
               left join user_teams ut on t.id = ut.team_id
               left join challenge_instances ci
                         on c.id = ci.challenge_id
                             and ci.start_time < now() and ci.end_time > now()
               left join user_stats us on ci.id = us.challenge_instance_id
               left join challenge_activities ca on c.id = ca.challenge_id
               left join activity_types at on ca.activity_type_id = at.id
      where ut.user_id = ${user_id}
      group by c.id, ci.start_time, ci.end_time, t.id, t.name, us.user_id
      order by is_completed desc, ci.end_time desc
      limit ${limit}
  `;

  const res = challenges.rows as Challenge[];

  res.forEach((r) => {
    let completed = true;
    r.activities.forEach((a) => {
      if (!a.is_completed) {
        completed = false;
      }
    });

    r.is_completed = completed;
  });

  return res;
};

export const getChallenge = async (challenge_id: number, user_id: string) => {
  const res = await sql`
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

  return res.rows[0] as Challenge;
};

export const createChallenge = async (
  info: Omit<Challenge, 'id' | 'is_completed' | 'team_name' | 'owner'>,
  user_id: string,
): Promise<number> => {
  if (
    info.team_id === 33 &&
    user_id !== 'b90ee37f-4cb3-4a3a-ac98-4a91ad2166ce'
  ) {
    throw new Error('Not allowed to create challenges in the default team');
  }

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

type StatDates = {
  date: Date;
  day_of_activity: Date;
};

export const getUserDailyStreak = async (user_id: string): Promise<number> => {
  const res = await sql`
      with distincs_dates as (select distinct Date(created_at) as day_of_activity
                              from user_stats
                              where user_id = ${user_id}),
           all_dates as (select generate_series(min(created_at), current_date + interval '1 day',
                                                interval '1 day')::date as date
                         from user_stats)
      select date, day_of_activity
      from all_dates
               left join distincs_dates on all_dates.date = distincs_dates.day_of_activity
      order by date desc;
  `;

  const rows = res.rows as StatDates[];

  let streak = 0;
  let should_break = false;
  rows.forEach((r, index) => {
    if (should_break) return;
    if (!!r.day_of_activity) {
      streak += 1;
    } else if (index !== 0) {
      should_break = true;
    }
  });

  return streak;
};

export const getUserAllTimeActivityStats = async (
  user_id: string,
): Promise<UserAllTimeActivityResult[]> => {
  const res = await sql`
      select at.id, at.name, sum(ca.n_units), at.unit
      from user_stats us
               join challenge_activities ca on ca.id = us.challenge_activity_id
               join activity_types at on ca.activity_type_id = at.id
      where us.user_id = ${user_id}
      group by at.id, at.name, at.unit
  `;

  return res.rows as UserAllTimeActivityResult[];
};

export const getUserDaysOfActivity = async (
  user_id: string,
): Promise<string[]> => {
  const res = await sql`
      select distinct to_char(Date(created_at), 'YYYY-MM-DD') as day_of_activity
      from user_stats
      where user_id = ${user_id}
        and extract(month from created_at) = extract(month from now())
  `;

  return res.rows.map((r) => r.day_of_activity) as string[];
};
