import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import React, { Suspense } from 'react';
import { Header } from '#/components/compound/header';
import { Button } from '#/components/ui/button';
import { ChallengesList } from '#/app/ui/team/[id]/challenges-list';
import Link from 'next/link';
import { mustUser } from '#/domains/user/server/sessions';
import { getTeam, getTeamMembers } from '#/domains/team/server/teams';
import { Join } from '#/app/ui/team/[id]/join';

export default async function Page({ params }: { params: { id: string } }) {
  const user = await mustUser();

  const teamID = Number(params.id);
  const teamInfo = await getTeam(teamID, user.id);

  const teamMembers = await getTeamMembers(teamID);
  if (!teamInfo) {
    return (
      <h1 className="m-12 text-4xl font-black text-rose-600">Team not found</h1>
    );
  }

  const createChallengeLink = `/ui/challenges/create?team_id=${teamID}`;

  return (
    <>
      <Header withBackNavigation />
      <div className="mt-4 flex w-full items-start justify-start gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={'#'} alt={teamInfo.name} />
          <AvatarFallback className="text-2xl">{teamInfo.emoji}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-black">{teamInfo.name}</h1>
          <p className="text-gray-600">{teamInfo.members_count} members</p>
        </div>
        <div className="ml-auto flex flex-col items-center">
          <h2 className="text-4xl leading-8">💎</h2>
          <p className="text-gray-600">+{teamInfo.rp_total} RP</p>
        </div>
      </div>
      <div className="flex w-full items-start gap-2 rounded-xl">
        {teamMembers.map((member) => (
          <div className="flex flex-col items-center gap-1" key={member.emoji}>
            <Avatar key={member.emoji} className="h-12 w-12 ">
              <AvatarFallback className="bg-neutral-800">
                <span>{member.emoji}</span>
              </AvatarFallback>
            </Avatar>
            <p className="text-muted-foreground text-sm">
              @{member.telegram_username}
            </p>
          </div>
        ))}
        <Link
          href={`/ui/team/members?team_id=${teamID}`}
          className="flex flex-col items-center justify-center gap-1"
        >
          <Avatar className="h-12 w-12 ">
            <AvatarFallback className="bg-neutral-800">
              <span className="text-3xl">+</span>
            </AvatarFallback>
          </Avatar>
          <p className="text-muted-foreground text-sm">All</p>
        </Link>
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
          <Link href={createChallengeLink}>Create challenge</Link>
        </Button>
      ) : (
        <Join team_id={teamID} />
      )}
    </>
  );
}
