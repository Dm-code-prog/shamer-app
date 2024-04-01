import Link from 'next/link';
import { Team } from '#/domains/team/types';
import { useTranslation } from 'react-i18next';

type Props = {
  teams: Team[];
  t: any;
};

export const TeamList = ({ teams, t }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {teams.map((team) => (
        <Link
          key={team.id}
          href={`/ui/team/${team.id}`}
          className="bg-muted flex justify-between gap-2 rounded-xl p-4"
        >
          <div className="flex flex-col items-start">
            {team.name}
            <p className="text-muted-foreground text-sm">
              {team.members_count} {t('members')}
            </p>
          </div>
          <p>{team.rp_total || 0} 🏆</p>
        </Link>
      ))}
    </div>
  );
};
