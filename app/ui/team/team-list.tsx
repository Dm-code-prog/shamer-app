import Link from 'next/link';

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
        <Link
          key={team.id}
          href={`/ui/team/${team.id}`}
          className="bg-muted flex justify-between gap-2 rounded-xl p-4"
        >
          <div className="flex flex-col items-start">
            {team.name}
            <p className="text-muted-foreground text-sm">
              {team.members_count} members
            </p>
          </div>
          <p>{team.rp_total || 0} RP</p>
        </Link>
      ))}
    </div>
  );
};
