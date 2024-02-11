'use client';

import { Button } from 'components/ui/button';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader } from '#/components/ui/card';
import React, { useEffect } from 'react';
import { Input } from '#/components/ui/input';
import { ShamerLogo } from '#/components/ui/shamer-logo';

export default function Page() {
  const router = useRouter();

  const [showForm, setShowForm] = React.useState(false);

  useEffect(() => {
    let ignore = false;
    // @ts-ignore
    if (!window?.Telegram?.WebApp?.initData) {
      alert('Please open this page in Telegram');
    }

    if (!ignore) {
      fetch('/api/auth/telegram', {
        method: 'POST',
        // @ts-ignore
        body: JSON.stringify(window?.Telegram?.WebApp?.initData),
      });
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Card className="flex flex-col items-center">
        <CardHeader>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h1 className="text-center text-xl">Let's get to know u!</h1>
        </CardHeader>
        {showForm ? (
          <CardContent className="flex w-full flex-col gap-4">
            <Input placeholder="Name"></Input>
            <Input placeholder="Age"></Input>
            <Input placeholder="Weight"></Input>
            <Button
              onClick={() => {
                router.push('/team');
              }}
            >
              Submit
            </Button>
          </CardContent>
        ) : (
          <CardContent className="flex w-full flex-col">
            <Button
              onClick={() => {
                setShowForm(true);
              }}
            >
              Get started
            </Button>
          </CardContent>
        )}
      </Card>
    </>
  );
}
