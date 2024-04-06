'use client';
import type { Challenge as ChallengeT } from '#/domains/challenge/types';
import Link from 'next/link';
import { Badge } from '#/components/ui/badge';
import { useCounter } from '#/hooks/useCounter';
import { ACTIVITY_TYPES } from '#/app/[locale]/ui/challenges/create/activity_types';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

type ChallengeProps = {
  challenge: ChallengeT;
};

export const Challenge = ({ challenge }: ChallengeProps) => {
  const { t } = useTranslation();

  const endsAt = useCounter(challenge.end_time);
  let cardClasses =
    'bg-muted flex w-full items-center justify-between gap-4 rounded-xl p-4 px-8';

  if (challenge.is_completed) {
    // add a green animated border
    cardClasses += ' opacity-50';
  }

  return (
    <Link
      key={challenge.id}
      className={cardClasses}
      href={`/ui/challenges/${challenge.id}`}
    >
      <div className="flex items-center justify-between gap-2">
        <h3 key={challenge.id} className="max-w-[130px] break-words">
          {challenge.name}
        </h3>
        {challenge.activities.map((a) => {
          const types = Object.entries(ACTIVITY_TYPES).find(
            ([key, value]) => value.name === a.type,
          );

          const type = types?.[1];
          if (!type) {
            return null;
          }

          return (
            <Image
              key={a.id}
              src={type.icon}
              alt={a.type}
              width={32}
              height={32}
            />
          );
        })}
      </div>
      {challenge.is_completed ? (
        <Badge variant="outline" className="text-md text-green-400">
          Completed
        </Badge>
      ) : (
        <p>
          {t('challenges.challenge.timer')} {endsAt}{' '}
        </p>
      )}
    </Link>
  );
};
