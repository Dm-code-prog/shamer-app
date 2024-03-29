import { TeamList } from './team-list';
import { getMyTeams } from '#/domains/team/server/teams';

type Props = {
  user_id: string;
  t: any;
};

export const MyTeams = async ({ user_id, t }: Props) => {
  const myTeams = await getMyTeams(user_id);
  return <TeamList t={t} teams={myTeams} />;
};
