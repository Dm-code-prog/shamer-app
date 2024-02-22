import { getTeamChallenges } from '#/data/challenges';
import { Badge } from '#/components/ui/badge';
import Link from 'next/link';

type ChallengesListProps = {
  id: number;
};

export const ChallengesList = async ({ id }: ChallengesListProps) => {
  const challenges = await getTeamChallenges(id);
  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="text-2xl font-black">Challenges</h2>
      {challenges.map((challenge) => (
        <Link
          key={challenge.id}
          className="bg-muted flex rounded-xl p-4"
          href={`/ui/challenges/${challenge.id}`}
        >
          <h3 key={challenge.id} className="text-xl">
            {challenge.name}
          </h3>
          {challenge.activity_types.map((activityType) => (
            <Badge key={activityType} variant="outline" className="ml-2">
              {activityType}
            </Badge>
          ))}
        </Link>
      ))}
    </div>
  );
};
