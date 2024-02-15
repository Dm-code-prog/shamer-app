import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { mustSession } from '#/session';
import { Card, CardContent, CardHeader } from '#/components/ui/card';
import { getUserProfileByID } from '#/data/users';

export default async function Page() {
  const session = await mustSession();

  const profile = await getUserProfileByID(session.user_id);

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
          <h2 className="text-xl font-bold">Your information</h2>
        </CardHeader>
        <CardContent>
          <div className="bg-muted flex justify-between gap-2 rounded-xl p-4">
            <div className="flex flex-col items-start">
              <h2 className="w-full">
                {profile?.first_name} {profile.last_name}
              </h2>
              <p className="text-muted-foreground text-sm">
                {profile?.age} years old
              </p>
            </div>
          </div>
          <div className="bg-muted flex justify-between gap-2 rounded-xl px-4">
            <div className="flex flex-col items-start">
              <h2 className="w-full">Weight</h2>
              <p className="text-muted-foreground text-sm">
                {profile?.weight} kg
              </p>
            </div>
          </div>

          <div className="bg-muted flex justify-between gap-2 rounded-xl p-4">
            <div className="flex flex-col items-start">
              <h2 className="w-full">Height</h2>
              <p className="text-muted-foreground text-sm">
                {profile?.height} cm
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
