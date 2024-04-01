'use client';
type League = {
  name: string;
  color: string;
  emoji?: string;
};

const leagues: League[] = [
  { name: 'bronze', color: 'bronze', emoji: '🥉' },
  { name: 'silver', color: 'silver', emoji: '🥈' },
  { name: 'gold', color: 'gold', emoji: '🥇' },
  { name: 'diamond', color: 'blue', emoji: '💎' }, // Assuming diamond as blue, adjust as needed
  { name: 'immortal', color: 'purple', emoji: '🛡️' }, // Assuming immortal as purple, adjust as needed
];

export const League = ({ league }: { league: string }) => {
  const leagueData = leagues.find((l) => l.name === league);

  return (
    <span className={`text-${leagueData?.color}`}>
      {leagueData?.name} {leagueData?.emoji}
    </span>
  );
};
