'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '#/components/ui/card';
import { useRouter } from 'next/navigation';
import { ShamerLogo } from '#/components/compound/shamer-logo';
import { AppDescription } from '#/app/auth/telegram/app-description';
import { Button } from '#/components/ui/button';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function Page() {
  const router = useRouter();

  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
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

    let ignore = false;
    // @ts-ignore
    if (!window?.Telegram?.WebApp?.initData) {
      alert('Please open this page in Telegram');
      return;
    }

    const authenticate = async () => {
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

    if (!ignore) {
      authenticate().catch(console.error);
    }

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
