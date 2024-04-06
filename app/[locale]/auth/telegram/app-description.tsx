import { useTranslation } from 'react-i18next';

export const AppDescription = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8 text-2xl">
      <p className="text-center">
        <span className="text-primary"> {t('team.normal')}</span>{' '}
        {t('team.bold')}
      </p>
      <p className="text-center">
        {t('challenges.normal')}{' '}
        <span className="text-primary">{t('challenges.bold')}</span>
      </p>
      <p className="text-center">
        {t('rewards.normal')}{' '}
        <span className="text-primary">{t('rewards.bold')}</span>
      </p>
      <p className="text-center">
        {t('story.normal')}{' '}
        <span className="text-primary">{t('story.bold')}</span>
      </p>
    </div>
  );
};
