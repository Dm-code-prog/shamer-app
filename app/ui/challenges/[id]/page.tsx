import { Avatar, AvatarFallback } from '#/components/ui/avatar';
import { Badge } from '#/components/ui/badge';
import { Checkbox } from '#/components/ui/checkbox';
import {
  getCompletedChallengeActivities,
  getFullChallengeInfoByID,
} from '#/domains/challenge/server/challenges';
import { Button } from '#/components/ui/button';
import Link from 'next/link';
import { Activities } from '#/app/ui/challenges/[id]/activities';
import { mustSession } from '#/session';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await mustSession();
  const fullChallengeInfo = await getFullChallengeInfoByID(parseInt(params.id));
  const completedActivities = await getCompletedChallengeActivities({
    challenge_id: parseInt(params.id),
    user_id: session.user_id,
  });

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarFallback className="text-5xl">🏆</AvatarFallback>
      </Avatar>

      <div className="w-32 text-center text-xl">
        {fullChallengeInfo.name} challenge
        <p className="text-muted-foreground text-sm">
          by @{fullChallengeInfo.owner_nickname}
        </p>
      </div>

      <Activities
        properties={fullChallengeInfo.activity_properties}
        completedActivities={completedActivities.challenge_activity_ids}
      />
    </div>
  );
}
