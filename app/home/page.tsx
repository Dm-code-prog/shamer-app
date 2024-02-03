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
import { Avatar, AvatarFallback, AvatarImage } from 'components/ui/avatar';
import { Progress } from 'components/ui/progress';
import { DataTableDemo } from './challenge_table';

export default function Page() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Dream team</CardTitle>
          <CardDescription>
            Your team, working together to achieve the greatness.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardContent>
      </Card>
      <h2 className="text-lg font-bold">Your progress</h2>
      <Progress value={33} />
      <DataTableDemo />
    </div>
  );
}
