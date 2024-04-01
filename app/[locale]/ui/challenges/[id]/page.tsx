import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { Activities } from './activities';
import { authorizeUser } from '#/domains/user/server/sessions';
import {
  canIViewChallenge,
  getChallenge,
} from '#/domains/challenge/server/challenges';
import { Button } from '#/components/ui/button';
import Link from 'next/link';

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { preview: boolean };
}) {
  const user = await authorizeUser();

  const challenge = await getChallenge(Number(params.id), user.id);

  if (!challenge) {
    return <h1 className="text-primary text-4xl">Challenge not found</h1>;
  }

  const authorized = await canIViewChallenge(Number(params.id), user.id);
  if (!authorized) {
    return (
      <>
        <h1 className="text-primary text-4xl">
          Oops. You are not allowed to view this challenge
        </h1>
        <h2 className=" text-2xl font-light">
          You can only view challenges of your team
        </h2>
      </>
    );
  }

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center gap-4">
      <h2 className="text-muted text-2xl font-light">{challenge.team_name}</h2>
      <Avatar className="h-24 w-24">
        <AvatarFallback className="text-5xl">🏆</AvatarFallback>
      </Avatar>

      <div className="w-32 text-center">
        <span className="text-primary break-words text-3xl font-bold">
          {challenge.name}
        </span>
        <p className="text-muted-foreground">by @{challenge.owner}</p>
      </div>

      {searchParams.preview ? (
        <div className="flex w-full flex-grow flex-col items-center gap-4 p-8">
          <h2 className="text-center text-4xl text-green-400">
            Challange is created!
          </h2>
          <p className="text-center text-2xl">Enjoy!</p>

          <Button className="mt-auto w-64" size="lg" asChild>
            <Link href={`/ui/challenges/${challenge.id}`}>Start</Link>
          </Button>
        </div>
      ) : (
        <Activities
          properties={challenge.activities}
          challenge_instance_id={challenge.instance_id!}
        />
      )}
    </div>
  );
}
