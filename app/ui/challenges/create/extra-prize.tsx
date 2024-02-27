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

export const ExtraPrize = () => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button size="sm" className="w" variant="link">
          Add extra prize
        </Button>
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-[420px] gap-4 px-8 py-16">
        <DrawerHeader>
          <DrawerTitle>Add any prize you want</DrawerTitle>
        </DrawerHeader>
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-sm">Your prize</h3>
          <Input placeholder="prize" className="w-full border-white" />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
