import { getPublicTeamsInfo } from '#/domains/team/server/teams';
import { TeamList } from '#/app/ui/team/team-list';

export const PublicTeams = async () => {
  const myTeams = await getPublicTeamsInfo(5);
  return <TeamList teams={myTeams} />;
};
