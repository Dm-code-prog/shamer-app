import { Header } from '#/components/compound/header';
import { mustUser } from '#/domains/user/server/sessions';
import {
  getUserAllTimeActivityStats,
  getUserDailyStreak,
  getUserDaysOfActivity,
} from '#/domains/challenge/server/challenges';
import { Card } from '#/components/ui/card';
import { ACTIVITY_TYPES } from '#/app/ui/challenges/create/activity_types';
import Image from 'next/image';
import ActivityCalendar from '#/app/ui/stats/activity-calendar';

export default async function Page() {
  const user = await mustUser();
  const streak = await getUserDailyStreak(user.id);

  const allTimeStats = await getUserAllTimeActivityStats(user.id);

  const activityDates = await getUserDaysOfActivity(user.id);

  return (
    <>
      <Header withBackNavigation />
      <div>
        <h1 className="text-5xl">{streak} days🔥</h1>
        <h3 className="text-muted text-center text-xl">streak</h3>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <h2 className="text-primary mt-8 text-4xl">Activity</h2>
        <ActivityCalendar activityDates={activityDates} />
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <h2 className="text-primary mt-8 text-4xl">All time results</h2>
        {allTimeStats.map((a) => {
          // @ts-ignore
          const icon = ACTIVITY_TYPES[a.name].icon.src;
          return (
            <Card key={a.id}>
              <div className="flex items-center justify-start gap-4">
                <Image
                  key={a.id}
                  src={icon}
                  alt={a.name}
                  width={32}
                  height={32}
                />
                <p className="ml-auto text-lg text-green-400">
                  {a.sum} {a.unit}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
