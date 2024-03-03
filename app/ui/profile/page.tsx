import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { BackNavigation } from '#/components/compound/back-navigation';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '#/components/ui/drawer';
import { Button } from '#/components/ui/button';
import { ScrollArea } from '#/components/ui/scroll-area';
import { ACTIVITY_TYPES } from '#/app/ui/challenges/create/activity_types';
import Image from 'next/image';
import React from 'react';
import { Info } from '#/app/ui/profile/info';
import { mustUser } from '#/domains/user/server/sessions';
import { Header } from '#/components/compound/header';

export default async function Page() {
  const user = await mustUser();

  return (
    <div className="flex w-full flex-grow flex-col items-center gap-4">
      <Header withBackNavigation />
      <Drawer>
        <DrawerTrigger>
          <Avatar className="h-16 w-16">
            <AvatarFallback key="fallback" className="text-3xl">
              {user.emoji}
            </AvatarFallback>
          </Avatar>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Here are some exercise options</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-[400px] w-full px-8">
            <div className="flex flex-wrap justify-around gap-8 p-8">
              {Object.entries(ACTIVITY_TYPES).map(([k, v]) => (
                <div
                  key={k}
                  className="bg-card flex h-24 w-24 items-center justify-center rounded-xl p-4"
                >
                  <Image src={v.icon} alt={k} />
                </div>
              ))}
            </div>
          </ScrollArea>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="ghost">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <h1 className="text-2xl font-black">@{user.telegram_username}</h1>
      <Info profile={user} />
    </div>
  );
}
