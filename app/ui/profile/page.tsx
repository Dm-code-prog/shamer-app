import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { mustSession } from '#/session';
import { getUserProfileByID } from '#/domains/user/server/users';
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

export default async function Page() {
  const session = await mustSession();

  const profile = await getUserProfileByID(session.user_id);

  return (
    <>
      <BackNavigation />
      <Drawer>
        <DrawerTrigger>
          <Avatar className="h-16 w-16">
            <AvatarFallback key="fallback" className="text-3xl">
              {session.emoji}
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
      <h1 className="text-2xl font-black">@{session.telegram_username}</h1>
      <Info profile={profile} />
    </>
  );
}
