import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '#/components/ui/drawer';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ExtraGoals = () => {
  const { t } = useTranslation();

  return (
    <Drawer>
      <DrawerTrigger>
        <Button size="sm" className="w" variant="link">
          {t('form.extra.goals')}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-[420px] gap-4 px-8 py-16">
        <DrawerHeader>
          <DrawerTitle>{t('form.extra.goals')}</DrawerTitle>
        </DrawerHeader>
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-sm">Targets</h3>
          <div className="flex w-full gap-4 ">
            <Input placeholder="reps" className="w-full border-white" />
            <Select defaultValue="0.3">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.1">6 minutes</SelectItem>
                <SelectItem value="0.3">18 minutes</SelectItem>
                <SelectItem value="0.5">30 minutes</SelectItem>
                <SelectItem value="1">1 hour</SelectItem>
                <SelectItem value="2">2 hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button variant="default" className="w-32" size="sm">
          Add more
        </Button>
      </DrawerContent>
    </Drawer>
  );
};
