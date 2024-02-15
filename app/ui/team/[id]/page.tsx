import { getFullTeamInfoByID } from '#/data/teams';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Card, CardContent } from '#/components/ui/card';
import React from 'react';
import { BackNavigation } from '#/components/ui/back-navigation';
import { Header } from '#/components/ui/header';
import { mustSession } from '#/session';
import { Button } from '#/components/ui/button';
import { Progress } from '#/components/ui/progress';

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
      <div className="flex w-full items-start gap-2">
        {teamInfo?.team_members?.map((member) => (
          <div className="flex flex-col items-center gap-1" key={member.emoji}>
            <Avatar key={member.emoji} className="h-12 w-12">
              <AvatarFallback>
                <span>{member.emoji}</span>
              </AvatarFallback>
            </Avatar>
            <p>0 RP</p>
          </div>
        ))}
      </div>
      <Progress value={0} max={100} />
      {teamInfo.current_user_is_member_or_owner ? (
        <Button variant="secondary" className="mt-auto w-full" size="lg">
          Create a challenge
        </Button>
      ) : (
        <Button variant="secondary" className="mt-auto w-full" size="lg">
          Join team
        </Button>
      )}
    </>
  );
}
