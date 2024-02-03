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
import { useRouter } from 'next/navigation';
import { DataTableDemo } from '#/app/home/challenge_table';

export default function Page() {
  const router = useRouter();
  const goHome = () => router.push('/home');

  return (
    <div className="space-y-8">
      <Card className="flex h-[400px] flex-col justify-between">
        <CardHeader>
          <CardTitle>You are so alone</CardTitle>
          <CardDescription>Lets find you a team.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between">
          <Button size="lg" variant="default" className="w-40" onClick={goHome}>
            Create a team
          </Button>
          <Button size="lg" variant="default" className="w-40" onClick={goHome}>
            Join a team
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
