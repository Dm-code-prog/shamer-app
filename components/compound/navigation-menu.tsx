'use client';
import { Button } from '#/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export const NavigationMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const selectedCl = 'border-primary w-full border-2 rounded-xl';

  return (
    <div className=" bg-background z-100 fixed bottom-0 flex w-full max-w-[420px] border-t-[0.5px] border-gray-800 ">
      <Button
        variant="ghost"
        size="lg"
        onClick={() => router.push('/ui/stats')}
        className={pathname.endsWith('/ui/stats') ? selectedCl : 'w-full'}
      >
        {t('stats')}
      </Button>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => router.push('/ui')}
        className={pathname.endsWith('/ui') ? selectedCl : 'w-full'}
      >
        {t('home')}
      </Button>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => router.push('/ui/team')}
        className={pathname.endsWith('/ui/team') ? selectedCl : 'w-full'}
      >
        {t('teams')}
      </Button>
    </div>
  );
};
