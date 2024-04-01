import { z } from 'zod';

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  telegram_username: string;
  created_at: string;
  emoji: string;
  age: number;
  weight: number;
  height: number;
  user_info_is_filled: boolean;
  has_team: boolean;
  rp_total: number;
  league: string;
};

export type TelegramUser = {
  externalID: string;
  firstName: string;
  lastName: string;
  telegramUsername: string;
};

export const UserInfoSchema = z.object({
  age: z.coerce.number().min(10),
  weight: z.coerce.number().min(42),
  height: z.coerce.number().min(120),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;

export const UseInviteCodeSchema = z.object({
  invite_code: z.string(),
});

export type UseInviteCodeRequest = z.infer<typeof UseInviteCodeSchema>;
