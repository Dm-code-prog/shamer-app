'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShamerLogo } from '#/components/compound/shamer-logo';
import { AppDescription } from './app-description';
import { Button } from '#/components/ui/button';
import toast from 'react-hot-toast';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Page() {
  const router = useRouter();

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
        Next
      </Button>
    </>
  );
}
