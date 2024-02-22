import { getFullTeamInfoByID } from '#/data/teams';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Card, CardContent } from '#/components/ui/card';
import React, { Suspense } from 'react';
import { BackNavigation } from '#/components/ui/back-navigation';
import { Header } from '#/components/ui/header';
import { mustSession } from '#/session';
import { Button } from '#/components/ui/button';
import { Progress } from '#/components/ui/progress';
import { ChallengesList } from '#/app/ui/team/[id]/challenges-list';
import Link from 'next/link';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await mustSession();

  const teamID = Number(params.id);
  const teamInfo = await getFullTeamInfoByID(teamID, session.user_id);
  if (!teamInfo) {
    return (
      <h1 className="m-12 text-4xl font-black text-rose-600">Team not found</h1>
    );
  }

  return (
    <>
      <Header withBackNavigation />
      <div className="mt-4 flex w-full items-start justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black">{teamInfo.name}</h1>
          <p className="text-gray-600">{teamInfo.members_count} members</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src={'#'} alt={teamInfo.name} />
          <AvatarFallback>{teamInfo.name[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex w-full items-start gap-2 rounded-xl">
        {teamInfo?.team_members?.map((member) => (
          <div className="flex flex-col items-center gap-1" key={member.emoji}>
            <Avatar key={member.emoji} className="h-12 w-12 ">
              <AvatarFallback className="bg-neutral-800">
                <span>{member.emoji}</span>
              </AvatarFallback>
            </Avatar>
            <p className="text-muted-foreground text-sm">@dmkozloff</p>
          </div>
        ))}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {/*//@ts-ignore*/}
        <ChallengesList id={teamID} />
      </Suspense>
      {teamInfo.current_user_is_member_or_owner ? (
        <Button
          variant="secondary"
          className="mt-auto w-full"
          size="lg"
          asChild
        >
          <Link href="/ui/challenges/create">Create challenge</Link>
        </Button>
      ) : (
        <Button variant="secondary" className="mt-auto w-full" size="lg">
          Join team
        </Button>
      )}
    </>
  );
}
