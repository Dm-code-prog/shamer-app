import { getUserChallenges } from '#/domains/challenge/server/challenges';
import { Challenge } from '#/components/compound/challenge';
import initTranslations from '#/app/i18n';

type Props = {
  user_id: string;
  locale: string;
};

export const ChallengesPreview = async ({ user_id, locale }: Props) => {
  const challenges = await getUserChallenges(user_id);
  const { t } = await initTranslations(locale, ['home']);

  return (
    <div className="flex w-full flex-col gap-4">
      {challenges.length > 0 && (
        <h2 className="text-3xl font-black">{t('challenges.title')}</h2>
      )}
      {challenges.map((challenge) => (
        <Challenge challenge={challenge} key={challenge.id} />
      ))}
    </div>
  );
};
