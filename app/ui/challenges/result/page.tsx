'use client';
import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { useSearchParams } from 'next/navigation';
import { Button } from '#/components/ui/button';
import Link from 'next/link';

export default function Page() {
  const searchParams = useSearchParams();

  const rp = searchParams.get('rp') || 100;

  return (
    <>
      <div className="flex h-full w-full flex-col items-center gap-4">
        <Avatar className="h-32 w-32">
          <AvatarFallback className="text-[64px]">🏆</AvatarFallback>
        </Avatar>
        <p className="mt-8 max-w-[260px] text-center text-xl">
          Well done you completed the challenge
        </p>
        <h2 className="relative m-2 text-7xl text-green-400">
          {rp}
          <span className="text-primary-foreground absolute bottom-2 right-[-20px] text-xl">
            RP
          </span>
        </h2>

        <Button className="w-64" size="lg">
          Share results
        </Button>

        <Button className="bg-card mt-auto w-32" asChild>
          <Link href={'/ui'}>Close</Link>
        </Button>
      </div>
    </>
  );
}
