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
import { HomeV0 } from '#/app/home/home-v0.0.1-alpha';

export default function Page() {
  return (
    <>
      <HomeV0 />
    </>
  );
}
