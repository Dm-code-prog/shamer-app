export type Property = {
  challenge_activity_id: number;
  type: string;
  unit: string;
  n_units: number;
  time: number;
  is_extra: boolean;
};

export type BasicChallengeInfo = {
  id: number;
  name: string;
  activity_types: string[];
};

export type FullChallengeInfo = {
  id: number;
  name: string;
  owner_nickname: string;
  activity_properties: Property[];
};

export type CreateChallengeInfo = {
  team_id: number;
  name: string;
  type: string;
  properties: Property[];
};

export type CompletedChallengeActivities = {
  user_id: string;
  challenge_activity_ids: number[];
};

export type GetCompletedChallengeActivities = {
  challenge_id: number;
  user_id: string;
};
