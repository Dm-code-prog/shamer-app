import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '#/components/ui/drawer';
import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { ScrollArea } from '#/components/ui/scroll-area';
import { ACTIVITY_TYPES } from '#/app/ui/challenges/create/activity_types';
import Image from 'next/image';
import { Button } from '#/components/ui/button';

type DrawerSelectItem = {
  value: string;
  src?: string;
  text?: string;
};

type Props = {
  children: React.ReactNode;
  title: string;
  items: DrawerSelectItem[];
  onSelect: (value: DrawerSelectItem) => void;
};

export const DrawerSelect = ({ children, title, items, onSelect }: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Drawer open={open}>
      <DrawerTrigger
        className="flex flex-col items-center gap-4"
        onClick={() => {
          setOpen(true);
        }}
      >
        {children}
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-[420px]">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <ScrollArea className="h-[400px] w-full px-8">
          <div className="flex flex-wrap justify-around gap-8 p-8">
            {items.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  onSelect({
                    value: item.value,
                    src: item.src,
                    text: item.text,
                  });
                  setOpen(false);
                }}
                className="bg-card flex h-24 w-24 items-center justify-center rounded-xl p-4"
              >
                {item.src && <Image src={item.src} alt={item.text || ''} />}
                {item.text && <span>{item.text}</span>}
              </div>
            ))}
          </div>
        </ScrollArea>
        <DrawerFooter>
          <DrawerClose>
            <Button
              variant="ghost"
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
