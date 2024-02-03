'use client';

import { Button } from 'components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '#/components/ui/card';
import { Input } from '#/components/ui/input';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Shamer.</CardTitle>
          <CardDescription>Let your fitness journey begin</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Name" />
        </CardContent>
        <CardContent>
          <Input placeholder="Age" />
        </CardContent>
        <CardContent>
          <Input placeholder="Weight" />
        </CardContent>
        <CardContent>
          <Input placeholder="Height" />
        </CardContent>
        <CardFooter>
          <Button variant="default" onClick={() => router.push('/team')}>
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
