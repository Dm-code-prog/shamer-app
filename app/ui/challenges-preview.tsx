import { getUserChallenges } from '#/domains/challenge/server/challenges';
import { Challenge } from '#/app/ui/team/[id]/challenge';

type Props = {
  user_id: string;
};

export const ChallengesPreview = async ({ user_id }: Props) => {
  const challenges = await getUserChallenges(user_id);

  return (
    <div className="flex w-full flex-col gap-4">
      {challenges.length > 0 && (
        <h2 className="text-3xl font-black">Challenges</h2>
      )}
      {challenges.map((challenge) => (
        <Challenge challenge={challenge} key={challenge.id} />
      ))}
    </div>
  );
};
