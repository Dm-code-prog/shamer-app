'use client';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader } from '#/components/ui/card';

export default function Page() {
  useEffect(() => {
    const lsInitData = localStorage.getItem('initData');
    if (lsInitData) {
      // Only for testing purposes in a browser
      // @ts-ignore
      window.Telegram.WebApp.initData = lsInitData;
    }

    let ignore = false;
    // @ts-ignore
    if (!window?.Telegram?.WebApp?.initData) {
      alert('Please open this page in Telegram');
      return;
    }

    if (!ignore) {
      fetch('/api/auth/telegram', {
        method: 'POST',
        // @ts-ignore
        body: JSON.stringify({ initData: window?.Telegram?.WebApp?.initData }),
      });
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <h1 className="text-center text-xl font-black">
            Verifying your Telegram identity...
          </h1>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Please wait a bit. We need to do it just once.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
