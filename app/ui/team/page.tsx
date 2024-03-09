import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';
import { Suspense } from 'react';
import { MyTeams } from '#/app/ui/team/my-teams';
import { PublicTeams } from '#/app/ui/team/public-teams';
import { Button } from '#/components/ui/button';
import Link from 'next/link';
import { mustUser } from '#/domains/user/server/sessions';

export default async function Teams({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const user = await mustUser();

  const defaultTab = searchParams?.type || 'my';

  return (
    <div className="flex h-full w-full flex-grow flex-col gap-4">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="my" className="w-full">
            My Teams
          </TabsTrigger>
          <TabsTrigger value="public" className="w-full">
            Public Teams
          </TabsTrigger>
        </TabsList>
        <TabsContent value="my">
          <Suspense fallback={<div>Loading...</div>}>
            {/* @ts-ignore */}
            <MyTeams user_id={user.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="public">
          <Suspense fallback={<div>Loading...</div>}>
            {/* @ts-ignore */}
            <PublicTeams user_id={user.id} />
          </Suspense>
        </TabsContent>
      </Tabs>
      <Button className="bg-card mt-auto w-32 self-center">
        I have invite code
      </Button>
      <Button
        variant="secondary"
        className=" w-64 self-center"
        size="lg"
        asChild
      >
        <Link href="/ui/team/create">Create team</Link>
      </Button>
    </div>
  );
}
