import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { Card, CardContent, CardHeader } from '#/components/ui/card';
import Link from 'next/link';
import { Button } from '#/components/ui/button';
import { authorizeUser } from '#/domains/user/server/sessions';
import { ChallengesPreview } from '#/app/[locale]/ui/challenges-preview';
import { unstable_noStore as noStore } from 'next/cache';
import initTranslations from '#/app/i18n';
import TranslationsProvider from '#/components/TranslationsProvider';
import { League } from '#/components/compound/league';

const emoji = '\u{1F603}';

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  noStore();
  const user = await authorizeUser();
  const { t, resources } = await initTranslations(locale, ['home']);

  return (
    <TranslationsProvider
      namespaces={['home']}
      locale={locale}
      resources={resources}
    >
      <>
        <div className="flex w-full flex-col justify-center gap-2">
          <div className="relative flex justify-between">
            <Link href="/ui/profile" className="text-2xl">
              ⚙️
            </Link>
            <span className="text-2xl">{user.rp_total || 0} 🏆</span>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <Avatar className="h-16 w-16">
              <AvatarFallback key="fallback" className="text-3xl">
                {user.emoji}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-2xl">@{user.telegram_username}</h1>
            <League league={user.league} />
          </div>
        </div>
        {/*@ts-ignore */}
        <ChallengesPreview user_id={user.id} locale={locale} />
        {!user.has_team && (
          <Card>
            <CardHeader>
              <h2 className="text-2xl">{t('banners.team.title')}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('banners.team.content')}
              </p>
              <Button className="mt-4 w-full" asChild>
                <Link href="/ui/team?type=public">Team up</Link>
              </Button>
            </CardContent>
          </Card>
        )}
        {!user.user_info_is_filled && (
          <Card>
            <CardHeader>
              <h2 className="text-2xl">{t('banners.info.title')}</h2>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t('banners.info.content')}
              </p>
              <Button className="mt-4 w-full" asChild>
                <Link href="/ui/profile">Complete profile</Link>
              </Button>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader>
            <h2 className="text-2xl">{t('banners.achievements.title')}</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {t('banners.achievements.content')} {emoji}
            </p>
          </CardContent>
        </Card>
      </>
    </TranslationsProvider>
  );
}
