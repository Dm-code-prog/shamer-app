'use client';

import React from 'react';
import initTranslations from '#/app/i18n';
import TranslationsProvider from '#/components/TranslationsProvider';
import { CreateTeamForm } from '#/app/[locale]/ui/team/create/form';

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, ['teams']);
  return (
    <TranslationsProvider
      namespaces={['teams']}
      locale={locale}
      resources={resources}
    >
      <CreateTeamForm />
    </TranslationsProvider>
  );
}
