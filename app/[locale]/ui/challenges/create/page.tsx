import React from 'react';
import dynamic from 'next/dynamic';
import initTranslations from '#/app/i18n';
import TranslationsProvider from '#/components/TranslationsProvider';

const CreateChallengeForm = dynamic(() => import('./form'), {
  ssr: false,
});

export default async function Page({
  searchParams,
  params: { locale },
}: {
  searchParams: { team_id: string };
  params: { locale: string };
}) {
  const { resources } = await initTranslations(locale, ['teams']);

  return (
    <TranslationsProvider
      namespaces={['teams']}
      locale={locale}
      resources={resources}
    >
      <CreateChallengeForm team_id={searchParams.team_id} />
    </TranslationsProvider>
  );
}
