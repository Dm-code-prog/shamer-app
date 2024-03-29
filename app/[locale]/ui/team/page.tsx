import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';
import { Suspense } from 'react';
import { MyTeams } from './my-teams';
import { PublicTeams } from './public-teams';
import { Button } from '#/components/ui/button';
import Link from 'next/link';
import { authorizeUser } from '#/domains/user/server/sessions';
import initTranslations from '#/app/i18n';
import TranslationsProvider from '#/components/TranslationsProvider';

export default async function Teams({
  searchParams,
  params: { locale },
}: {
  searchParams?: { [key: string]: string | undefined };
  params: { locale: string };
}) {
  const user = await authorizeUser();

  const defaultTab = searchParams?.type || 'my';

  const { t, resources } = await initTranslations(locale, ['teams']);

  return (
    <TranslationsProvider
      namespaces={['teams']}
      locale={locale}
      resources={resources}
    >
      <div className="flex h-full w-full flex-grow flex-col gap-4">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="my" className="w-full">
              {t('myTeams')}
            </TabsTrigger>
            <TabsTrigger value="public" className="w-full">
              {t('publicTeams')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="my">
            <Suspense fallback={<div>Loading...</div>}>
              {/* @ts-ignore */}
              <MyTeams t={t} user_id={user.id} />
            </Suspense>
          </TabsContent>
          <TabsContent value="public">
            <Suspense fallback={<div>Loading...</div>}>
              {/* @ts-ignore */}
              <PublicTeams t={t} user_id={user.id} />
            </Suspense>
          </TabsContent>
        </Tabs>
        <Button className="bg-card mt-auto w-32 self-center">
          {t('cta.inviteCode')}
        </Button>
        <Button
          variant="secondary"
          className=" w-64 self-center"
          size="lg"
          asChild
        >
          <Link href="/ui/team/create">{t('cta.createTeam')}</Link>
        </Button>
      </div>
    </TranslationsProvider>
  );
}
