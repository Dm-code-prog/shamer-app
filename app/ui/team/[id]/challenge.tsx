'use client';
import type { Challenge as ChallengeT } from '#/domains/challenge/types';
import Link from 'next/link';
import { Badge } from '#/components/ui/badge';
import { useCounter } from '#/hooks/useCounter';
import { ACTIVITY_TYPES } from '#/app/ui/challenges/create/activity_types';
import Image from 'next/image';

type ChallengeProps = {
  challenge: ChallengeT;
};

export const Challenge = ({ challenge }: ChallengeProps) => {
  const endsAt = useCounter(challenge.end_time);
  let cardClasses =
    'bg-muted flex w-full items-center justify-between gap-4 rounded-xl p-4';

  if (challenge.is_completed) {
    // add a green animated border
    cardClasses += ' opacity-50';
  }
  // @ts-ignore
  const icon = ACTIVITY_TYPES[a.type].icon.src;

  return (
    <Link
      key={challenge.id}
      className={cardClasses}
      href={`/ui/challenges/${challenge.id}`}
    >
      <div className="flex w-[120px] items-center justify-between gap-2">
        <h3 key={challenge.id} className="text-xl">
          {challenge.name}
        </h3>
        {challenge.activities.map((a) => (
          <Image key={a.id} src={icon} alt={a.type} width={32} height={32} />
        ))}
      </div>
      {challenge.is_completed ? (
        <Badge variant="outline" className="text-md text-green-400">
          Completed
        </Badge>
      ) : (
        <p>ends in {endsAt} </p>
      )}
    </Link>
  );
};
