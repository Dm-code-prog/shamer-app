'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';
import { Input } from '#/components/ui/input';
import { Button } from '#/components/ui/button';
import { useRouter } from 'next/navigation';
import { DataTableDemo } from '#/app/home/challenge_table';
import React from 'react';
import { ShamerLogo } from '#/components/ui/shamer-logo';

export default function Page() {
  const router = useRouter();
  const gotoCreate = () => router.push('/team/create');

  return (
    <>
      <Card className="flex flex-col items-center">
        <CardHeader>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <h1 className="text-xl">Let's team up!</h1>
        </CardHeader>
        <CardContent>
          <div className="flex w-full justify-between gap-4">
            <Button variant="default" onClick={gotoCreate}>
              Create team
            </Button>
            <Button
              onClick={() => {
                router.push('/team/join');
              }}
              variant="secondary"
            >
              Join team
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
