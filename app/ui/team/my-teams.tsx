import { mustSession } from '#/session';
import { getUserTeamsInfo } from '#/data/teams';
import { TeamList } from '#/app/ui/team/team-list';

export const MyTeams = async () => {
  const session = await mustSession();

  const myTeams = await getUserTeamsInfo(session.user_id);

  return <TeamList teams={myTeams} />;
};
