'use client';

import { Button } from '#/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '#/components/ui/drawer';
import React from 'react';
import { Input } from '#/components/ui/input';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export const JoinByInviteCode = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [inviteCode, setInviteCode] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSave = async () => {
    if (inviteCode.length === 0) {
      setError(t('joinByInvite.error'));
      return;
    }

    const res = await fetch('/api/team/join/invite', {
      method: 'POST',
      body: JSON.stringify({ invite_code: inviteCode }),
    });

    if (!res.ok) {
      setError(t('joinByInvite.error'));
      return;
    }

    const { team_id } = await res.json();
    router.push(`/ui/team/${team_id}`);

    setError('');
  };

  return (
    <Drawer>
      <DrawerTrigger className="mt-auto">
        <Button className="bg-card mt-auto w-32 self-center">
          {t('cta.inviteCode')}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto flex max-w-[420px] flex-col items-center gap-8 px-8 pb-8 ">
        <DrawerHeader>
          <h2 className="text-2xl font-bold">{t('joinByInvite.title')}</h2>
        </DrawerHeader>
        <Input
          placeholder={t('joinByInvite.code')}
          className="w-64"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          variant="default"
          className="w-64"
          size="sm"
          onClick={handleSave}
          disabled={!inviteCode}
        >
          {t('joinByInvite.save')}
        </Button>
      </DrawerContent>
    </Drawer>
  );
};
