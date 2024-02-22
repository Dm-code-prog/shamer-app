'use client';
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
import { Card, CardContent, CardHeader } from '#/components/ui/card';
import React from 'react';
import { ScrollArea } from '#/components/ui/scroll-area';
import Image from 'next/image';
import { ACTIVITY_TYPES } from '#/app/ui/challenges/create/activity_types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select';
import { Input } from '#/components/ui/input';

export default function Page() {
  return (
    <>
      <h2 className="text-5xl font-bold">Hell</h2>
      <Card className="flex flex-col items-center p-8">
        <CardContent className="flex w-full flex-col items-center">
          <Drawer>
            <DrawerTrigger>
              <Button
                size="sm"
                variant="outline"
                className="h-24 w-24 rounded-xl"
              >
                Pick exercises
              </Button>
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

          <div className="flex flex-col gap-4 py-4">
            <div className="flex w-full flex-col gap-2">
              <h3 className="text-sm">Targets</h3>
              <div className="flex w-full gap-4 ">
                <Input placeholder="reps" className="w-full border-white" />
                <Select defaultValue="0.5">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">30 minutes</SelectItem>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="2">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2">
              <h3 className="text-sm">Type</h3>
              <Select defaultValue="daily">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-around">
            <Drawer>
              <DrawerTrigger>
                <Button size="sm" className="w" variant="link">
                  Add extra goals
                </Button>
              </DrawerTrigger>
              <DrawerContent className="gap-4 px-8 py-16">
                <DrawerHeader>
                  <DrawerTitle>Add your extra goals</DrawerTitle>
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

            <Drawer>
              <DrawerTrigger>
                <Button size="sm" className="w" variant="link">
                  Add extra prize
                </Button>
              </DrawerTrigger>
              <DrawerContent className="gap-4 px-8 py-16">
                <DrawerHeader>
                  <DrawerTitle>Add any prize you want</DrawerTitle>
                </DrawerHeader>
                <div className="flex w-full flex-col gap-2">
                  <h3 className="text-sm">Your prize</h3>
                  <Input placeholder="prize" className="w-full border-white" />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </CardContent>
      </Card>

      <Button size="lg" className="w-64">
        Create challenge
      </Button>
    </>
  );
}
