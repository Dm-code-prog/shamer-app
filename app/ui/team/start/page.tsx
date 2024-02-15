'use client';

import { Card, CardContent, CardHeader } from '#/components/ui/card';
import { Button } from '#/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Page() {
  const router = useRouter();
  const gotoCreate = () => router.push('/ui/team/start/create');
  const gotoJoin = () => {
    router.push('/ui/team/start/join');
  };

  return (
    <>
      <Card className="flex flex-col items-center">
        <CardHeader>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h1 className="text-3xl">Let's team up!</h1>
        </CardHeader>
        <CardContent>
          <div className="flex w-full justify-between gap-4">
            <Button variant="default" onClick={gotoCreate}>
              Create team
            </Button>
            <Button onClick={gotoJoin} variant="secondary">
              Join team
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
