'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '#/components/ui/card';
import { useRouter } from 'next/navigation';
import { ShamerLogo } from '#/components/compound/shamer-logo';
import { AppDescription } from '#/app/auth/telegram/app-description';
import { Button } from '#/components/ui/button';
import Link from 'next/link';
import toast from 'react-hot-toast';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Page() {
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
        asChild
        disabled={!authenticated}
      >
        <Link href="/ui">Next</Link>
      </Button>
    </>
  );
}
