import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Badge } from '#/components/ui/badge';
import { Checkbox } from '#/components/ui/checkbox';
import { Header } from '#/components/ui/header';
import { getFullChallengeInfoByID } from '#/data/challenges';
import { Button } from '#/components/ui/button';
import Link from 'next/link';

export default async function Page({ params }: { params: { id: string } }) {
  const info = await getFullChallengeInfoByID(parseInt(params.id));

  return (
    <div className="flex h-full w-full flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarFallback className="text-5xl">🏆</AvatarFallback>
      </Avatar>

      <p className="w-32 text-center text-xl">
        {info.name} challenge
        <p className="text-muted-foreground text-sm">
          by @{info.owner_nickname}
        </p>
      </p>

      {info.activity_properties.map((activity, index) => (
        <div
          key={index}
          className="bg-card flex w-full justify-between rounded-xl p-4"
        >
          <div>
            <p>
              {activity.n_units} {activity.unit} of {activity.type} in{' '}
              {activity.time * 60} min.
            </p>
            {activity.is_extra && (
              <Badge className="bg-primary text-white">Extra</Badge>
            )}
          </div>
          <Checkbox />
        </div>
      ))}

      <h2 className="m-2 text-3xl text-green-400">+100 RP</h2>

      <Button className="mt-auto w-full" size="lg" asChild>
        <Link href={'/ui/challenges/result?rp=120'}>Submit result</Link>
      </Button>
    </div>
  );
}
