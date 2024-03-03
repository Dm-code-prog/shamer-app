import { TeamList } from '#/app/ui/team/team-list';
import { getPublicTeams } from '#/domains/team/server/teams';

export const PublicTeams = async ({ user_id }: { user_id: string }) => {
  const myTeams = await getPublicTeams(user_id, 5);

  myTeams.sort((a, b) => b.rp_total - a.rp_total);
  return <TeamList teams={myTeams} />;
};
