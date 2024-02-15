import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { mustSession } from '#/session';
import { Card, CardContent, CardHeader } from '#/components/ui/card';
import { NavigationMenu } from '#/components/ui/navigation-menu';

const emoji = '\u{1F603}';

export default async function Page() {
  const session = await mustSession();

  return (
    <>
      <Avatar className="h-16 w-16">
        <AvatarFallback key="fallback" className="text-3xl">
          {session.emoji}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-2xl font-black">@{session.telegram_username}</h1>
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Activity</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Nothing here yet {emoji}</p>
        </CardContent>
      </Card>
    </>
  );
}
