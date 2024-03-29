import { getTeamChallenges } from '#/domains/challenge/server/challenges';
import { Challenge } from '#/components/compound/challenge';
import { authorizeUser } from '#/domains/user/server/sessions';

type ChallengesListProps = {
  id: number;
  t: any;
};

export const ChallengesList = async ({ id, t }: ChallengesListProps) => {
  const user = await authorizeUser();
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
      <h2 className="text-2xl font-black">{t('challenges.title')}</h2>
      {challenges.map((challenge) => (
        <Challenge challenge={challenge} key={challenge.id} />
      ))}
    </div>
  );
};
