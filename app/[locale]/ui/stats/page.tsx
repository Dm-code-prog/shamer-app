import { Header } from '#/components/compound/header';
import { authorizeUser } from '#/domains/user/server/sessions';
import {
  getUserAllTimeActivityStats,
  getUserDailyStreak,
  getUserDaysOfActivity,
} from '#/domains/challenge/server/challenges';
import { Card } from '#/components/ui/card';
import { ACTIVITY_TYPES } from '#/app/[locale]/ui/challenges/create/activity_types';
import Image from 'next/image';
import ActivityCalendar from './activity-calendar';
import initTranslations from '#/app/i18n';
import TranslationsProvider from '#/components/TranslationsProvider';

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const user = await authorizeUser();

  const [streak, allTimeStats, activityDates] = await Promise.all([
    getUserDailyStreak(user.id),
    getUserAllTimeActivityStats(user.id),
    getUserDaysOfActivity(user.id),
  ]);

  const { t, resources } = await initTranslations(locale, ['stats']);

  return (
    <TranslationsProvider
      namespaces={['stats']}
      locale={locale}
      resources={resources}
    >
      <Header withBackNavigation />
      <div>
        <h1 className="text-5xl">
          {streak} {t('streak.days')}🔥
        </h1>
        <h3 className="text-muted text-center text-xl">{t('streak.streak')}</h3>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <h2 className="text-primary mt-8 text-4xl">{t('activity.title')}</h2>
        <ActivityCalendar activityDates={activityDates} />
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <h2 className="text-primary mt-8 text-4xl">
          {t('allTimeResults.title')}
        </h2>
        {allTimeStats.map((a) => {
          const types = Object.entries(ACTIVITY_TYPES).find(
            ([key, value]) => value.name === a.name,
          );

          const type = types?.[1];
          if (!type) {
            return null;
          }
          return (
            <Card key={a.id}>
              <div className="flex items-center justify-start gap-4">
                <Image
                  key={a.id}
                  src={type.icon.src}
                  alt={a.name}
                  width={32}
                  height={32}
                />
                <p className="ml-auto text-lg text-green-400">
                  {a.sum} {t('units.' + type.unit)}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </TranslationsProvider>
  );
}
