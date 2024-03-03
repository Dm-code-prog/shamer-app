import { TeamList } from '#/app/ui/team/team-list';
import { getMyTeams } from '#/domains/team/server/teams';

type Props = {
  user_id: string;
};

export const MyTeams = async ({ user_id }: Props) => {
  const myTeams = await getMyTeams(user_id);
  return <TeamList teams={myTeams} />;
};
