import { z } from 'zod';

export type Team = {
  id: number;
  name: string;
  description: string;
  created_at: Date;
  is_public: boolean;
  owner_id: string;
  emoji: string;
  members_count: number;
  rp_total: number;
  current_user_is_member_or_owner: boolean;
};

export const CreateTeamRequestSchema = z.object({
  name: z.string().min(3, {
    message: 'The name is too short',
  }),
  emoji: z.string().min(1),
  description: z.string().optional(),
  is_public: z.boolean(),
});

export type CreateTeamRequest = z.infer<typeof CreateTeamRequestSchema>;

export const JoinTeamRequestSchema = z.object({
  team_id: z.number(),
});

export type JoinTeamRequest = z.infer<typeof JoinTeamRequestSchema>;
