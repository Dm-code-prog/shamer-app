import { z } from 'zod';

export type Activity = {
  id: number;
  type: string;
  units: number;
  n_units: number;
  met: number;
  time: number;
  weight_coefficient: number;
  is_extra: boolean;
  is_completed: boolean;
};

export type Challenge = {
  id: number;
  team_id: number;
  team_name?: string;
  name: string;
  type: string;
  instance_id?: number;
  start_time: Date;
  end_time: Date;
  is_completed: boolean;
  activities: Activity[];
  owner?: string;
};

export const CreateChallengeRequestSchema = z.object({
  name: z.string(),
  type: z.string(),
  team_id: z.number(),
  activities: z.array(
    z.object({
      type: z.string(),
      n_units: z.number(),
      time: z.number(),
      is_extra: z.boolean(),
    }),
  ),
});

export type CreateChallengeRequest = z.infer<
  typeof CreateChallengeRequestSchema
>;

export type CompleteChallengeActivityRequest = {
  challenge_instance_id: number;
  activity_ids: number[];
};

export type UserAllTimeActivityResult = {
  id: number;
  name: string;
  sum: number;
  unit: string;
};
