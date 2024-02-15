import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

type Team = {
  id: number;
  name: string;
  members_count: number;
  rp_total?: number;
};

type Props = {
  teams: Team[];
};

export const TeamList = ({ teams }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {teams.map((team) => (
        <div
          key={team.id}
          className="bg-muted flex justify-between gap-2 rounded-xl p-4"
        >
          <div className="flex flex-col items-center">
            <Link
              href={`/ui/team/${team.id}`}
              className="text-secondary flex items-baseline gap-1"
            >
              {team.name} <ArrowUpRight size={20} />
            </Link>
            <p className="text-muted-foreground text-sm">
              {team.members_count} members
            </p>
          </div>
          <p>{team.rp_total || 0} RP</p>
        </div>
      ))}
    </div>
  );
};
