'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ShamerLogo } from '#/components/compound/shamer-logo';
import { AppDescription } from '#/app/[locale]/auth/telegram/app-description';
import { Button } from '#/components/ui/button';
import { useTranslation } from 'react-i18next';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const Welcome = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const [authenticated, setAuthenticated] = useState(false);

  const auth = async () => {
    await sleep(1000);

    const lsInitData = localStorage.getItem('initData');
    if (lsInitData) {
      // Only for testing purposes in a browser
      // @ts-ignore
      window.Telegram = {
        WebApp: {
          initData: lsInitData,
        },
      };
    }

    // @ts-ignore
    if (!window?.Telegram?.WebApp?.initData) {
      alert('Please open this page in Telegram');
      return;
    }

    const res = await fetch('/api/auth/telegram', {
      method: 'POST',
      // @ts-ignore
      body: JSON.stringify({ initData: window?.Telegram?.WebApp?.initData }),
    });
    if (res.ok) {
      setAuthenticated(true);
      toast.success('Welcome to Shamer!');
    }
  };

  useEffect(() => {
    let ignore = false;
    auth().then(() => {
      if (!ignore) {
        setAuthenticated(true);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <ShamerLogo />
      <AppDescription />
      <Button
        size="lg"
        className="mt-auto w-64"
        disabled={!authenticated}
        onClick={() => router.push('/ui')}
      >
        {t('next')}
      </Button>
    </>
  );
};
