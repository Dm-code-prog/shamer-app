import initTranslations from '#/app/i18n';
import TranslationsProvider from '#/components/TranslationsProvider';
import { Welcome } from '#/app/[locale]/auth/telegram/welcome';

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { t, resources } = await initTranslations(locale, ['welcome']);
  return (
    <TranslationsProvider
      namespaces={['welcome']}
      locale={locale}
      resources={resources}
    >
      <Welcome />
    </TranslationsProvider>
  );
}
