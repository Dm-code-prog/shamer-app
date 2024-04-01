type League = {
  name: string;
  color: string;
  emoji?: string;
};

const leagues: League[] = [
  { name: 'bronze', color: 'bronze', emoji: '🥉' },
  { name: 'silver', color: 'silver', emoji: '🥈' },
  { name: 'gold', color: 'gold', emoji: '🥇' },
  { name: 'diamond', color: 'blue', emoji: '💎' },
  { name: 'immortal', color: 'purple', emoji: '🛡️' },
];

const classes = {
  bronze: 'text-bronze',
  silver: 'text-silver',
  gold: 'text-gold',
  blue: 'text-blue',
  purple: 'text-purple',
} as const;

export const League = ({ league }: { league: string }) => {
  const leagueData = leagues.find((l) => l.name === league);
  // @ts-ignore
  const className = classes[leagueData.color];
  return (
    <span className={className}>
      {leagueData?.name} {leagueData?.emoji}
    </span>
  );
};
