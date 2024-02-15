import { Button } from '#/components/ui/button';
import Link from 'next/link';

export const NavigationMenu = () => {
  return (
    <div className=" bg-background z-100 absolute bottom-0 flex w-full max-w-[420px] border-t-[0.5px] border-gray-800 ">
      <Button variant="ghost" className="w-full" size="lg" asChild>
        <Link href="/ui/profile">Profile</Link>
      </Button>
      <Button variant="ghost" className="w-full" size="lg" asChild>
        <Link href="/ui">Home</Link>
      </Button>
      <Button variant="ghost" className="w-full" size="lg" asChild>
        <Link href="/ui/team">Teams</Link>
      </Button>
    </div>
  );
};
