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
  let challenges = await getTeamChallenges(id, user.id);
  challenges.sort((a, b): number => {
    // If both items are either completed or not completed, maintain their order
    if (a.is_completed === b.is_completed) {
      return 0;
    }
    // If the first item is completed but the second isn't, move the first item towards the end
    if (a.is_completed && !b.is_completed) {
      return 1;
    }
    // If the second item is completed but the first isn't, move the second item towards the end
    if (!a.is_completed && b.is_completed) {
      return -1;
    }

    return 0;
  });
  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="text-2xl font-black">Challenges</h2>
      {challenges.map((challenge) => (
        <Challenge challenge={challenge} key={challenge.id} />
      ))}
    </div>
  );
};
