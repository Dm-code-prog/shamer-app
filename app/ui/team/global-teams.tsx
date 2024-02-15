import { getPublicTeamsInfo } from '#/data/teams';
import { TeamList } from '#/app/ui/team/team-list';

export const GlobalTeams = async () => {
  const myTeams = await getPublicTeamsInfo(5);
  return <TeamList teams={myTeams} />;
};
