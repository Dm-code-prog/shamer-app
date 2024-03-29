import { TeamList } from './team-list';
import { getPublicTeams } from '#/domains/team/server/teams';

export const PublicTeams = async ({
  user_id,
  t,
}: {
  user_id: string;
  t: any;
}) => {
  const myTeams = await getPublicTeams(user_id, 5);

  myTeams.sort((a, b) => b.rp_total - a.rp_total);
  return <TeamList t={t} teams={myTeams} />;
};
