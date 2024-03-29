import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '#/components/ui/drawer';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ExtraPrize = () => {
  const { t } = useTranslation();

  return (
    <Drawer>
      <DrawerTrigger>
        <Button size="sm" className="w" variant="link">
          {t('form.extra.prize')}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-[420px] gap-4 px-8 py-16">
        <DrawerHeader>
          <DrawerTitle>{t('form.extra.prize')}</DrawerTitle>
        </DrawerHeader>
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-sm">Your prize</h3>
          <Input placeholder="prize" className="w-full border-white" />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
