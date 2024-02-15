import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs';
import { TeamList } from '#/app/ui/team/team-list';
import { Suspense } from 'react';
import { MyTeams } from '#/app/ui/team/my-teams';
import { GlobalTeams } from '#/app/ui/team/global-teams';
import { Button } from '#/components/ui/button';

export default function Teams() {
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h1 className="text-3xl font-bold">Teams</h1>
      <Tabs defaultValue="my" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="my" className="w-full">
            My Teams
          </TabsTrigger>
          <TabsTrigger value="global" className="w-full">
            Global Teams
          </TabsTrigger>
        </TabsList>
        <TabsContent value="my">
          <Suspense fallback={<div>Loading...</div>}>
            {/* @ts-ignore */}
            <MyTeams />
          </Suspense>
        </TabsContent>
        <TabsContent value="global">
          <Suspense fallback={<div>Loading...</div>}>
            {/* @ts-ignore */}
            <GlobalTeams />
          </Suspense>
        </TabsContent>
      </Tabs>
      <Button variant="secondary" className="mt-auto" size="lg">
        Create a team
      </Button>
    </div>
  );
}
