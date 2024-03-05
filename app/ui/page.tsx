import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { Card, CardContent, CardHeader } from '#/components/ui/card';
import Link from 'next/link';
import { Button } from '#/components/ui/button';
import { mustUser } from '#/domains/user/server/sessions';
import { ChallengesPreview } from '#/app/ui/challenges-preview';
import { unstable_noStore as noStore } from 'next/cache';

const emoji = '\u{1F603}';

export default async function Page() {
  noStore();
  const user = await mustUser();

  return (
    <>
      <div className="flex w-full flex-col justify-center gap-2">
        <div className="flex justify-between">
          <Link href="/ui/profile" className="text-xl">
            ⚙️
          </Link>
          <span className="text-xl">🏆 {user.rp_total} RP</span>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Avatar className="h-16 w-16">
            <AvatarFallback key="fallback" className="text-3xl">
              {user.emoji}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-black">@{user.telegram_username}</h1>
        </div>
      </div>

      {!user.has_team && (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Activities</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You do not have a team yet. 😔
            </p>
            <Button className="mt-4 w-full" asChild>
              <Link href="/ui/team?type=public">Team up</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/*@ts-ignore */}
      <ChallengesPreview user_id={user.id} />

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Achievements</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Coming soon! {emoji}</p>
        </CardContent>
      </Card>
    </>
  );
}
