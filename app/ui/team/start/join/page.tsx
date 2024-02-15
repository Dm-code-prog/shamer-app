import { Card, CardContent, CardHeader } from '#/components/ui/card';
import { Button } from '#/components/ui/button';
import { Input } from '#/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPublicTeamsInfo } from '#/data/teams';

export default async function Page() {
  const publicTeams = await getPublicTeamsInfo(5);

  return (
    <>
      <Card>
        <CardHeader>
          <h1 className="text-center text-xl font-black">Public groups</h1>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {publicTeams.map((team) => (
            <div
              className="flex items-center justify-between rounded-xl border p-4"
              key={team.name}
            >
              <div className="space-y-1">
                <h2 className="text-lg font-semibold">{team.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {team.members_count} members
                </p>
              </div>
              <Button size="sm" variant="link" asChild>
                <Link href={`/ui/team/${team.id}`}>More</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      <Input placeholder="Use invite code" />
      <Button className="w-full">Join by invite</Button>
    </>
  );
}
