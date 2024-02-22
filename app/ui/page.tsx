import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { mustSession } from '#/session';
import { Card, CardContent, CardHeader } from '#/components/ui/card';
import Link from 'next/link';
import { Button } from '#/components/ui/button';

const emoji = '\u{1F603}';

export default async function Page() {
  const session = await mustSession();

  return (
    <>
      <div className="flex w-full flex-col justify-center gap-2">
        <div className="flex justify-between">
          <span className="text-xl">⚙️</span>
          <span className="text-xl">🏆 100 RP</span>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Avatar className="h-16 w-16">
            <AvatarFallback key="fallback" className="text-3xl">
              {session.emoji}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-black">@{session.telegram_username}</h1>
        </div>
      </div>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Activity</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Nothing here yet {emoji}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Challenges</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You do not have any challenges
          </p>
          <Button className="mt-4 w-full" size="lg" asChild>
            <Link href="/ui/challenges/create">Create challenge</Link>
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
