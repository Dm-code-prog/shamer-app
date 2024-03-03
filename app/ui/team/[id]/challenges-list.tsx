import { getTeamChallenges } from '#/domains/challenge/server/challenges';
import { Badge } from '#/components/ui/badge';
import Link from 'next/link';
import { Challenge } from '#/app/ui/team/[id]/challenge';
import { mustUser } from '#/domains/user/server/sessions';

type ChallengesListProps = {
  id: number;
};

export const ChallengesList = async ({ id }: ChallengesListProps) => {
  const user = await mustUser();
  const challenges = await getTeamChallenges(id, user.id);
  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="text-2xl font-black">Challenges</h2>
      {challenges.map((challenge) => (
        <Challenge challenge={challenge} key={challenge.id} />
      ))}
    </div>
  );
};
