'use client';
import type { Challenge as ChallengeT } from '#/domains/challenge/types';
import Link from 'next/link';
import { Badge } from '#/components/ui/badge';
import { useCounter } from '#/hooks/useCounter';

type ChallengeProps = {
  challenge: ChallengeT;
};

export const Challenge = ({ challenge }: ChallengeProps) => {
  const endsAt = useCounter(challenge.end_time);
  let cardClasses =
    'bg-muted flex w-full items-center justify-between gap-4 rounded-xl p-4';

  if (challenge.is_completed) {
    // add a green animated border
    cardClasses += ' border-green-500 border-4 animate-pulse';
  }

  return (
    <Link
      key={challenge.id}
      className={cardClasses}
      href={`/ui/challenges/${challenge.id}`}
    >
      <div className="flex items-center gap-2">
        <h3 key={challenge.id} className="text-xl">
          {challenge.name}
        </h3>
        {challenge.activities.map((a) => (
          <Badge key={a.type} variant="outline" className="ml-2 font-normal">
            {a.type}
          </Badge>
        ))}
      </div>
      <p>ends in {endsAt} </p>
    </Link>
  );
};
