'use client';
import { Button } from '#/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';

export const NavigationMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  const selectedCl = 'border-primary w-full border-2 rounded-xl';

  return (
    <div className=" bg-background z-100 fixed bottom-0 flex w-full max-w-[420px] border-t-[0.5px] border-gray-800 ">
      <Button
        variant="ghost"
        size="lg"
        onClick={() => router.push('/ui/stats')}
        className={pathname === '/ui/stats' ? selectedCl : 'w-full'}
      >
        Stats
      </Button>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => router.push('/ui')}
        className={pathname === '/ui' ? selectedCl : 'w-full'}
      >
        Home
      </Button>
      <Button
        variant="ghost"
        size="lg"
        onClick={() => router.push('/ui/team')}
        className={pathname === '/ui/team' ? selectedCl : 'w-full'}
      >
        Teams
      </Button>
    </div>
  );
};
