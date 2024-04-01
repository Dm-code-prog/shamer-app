import { createInviteCode, getTeamMembers } from '#/domains/team/server/teams';
import { Card } from '#/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar';
import { Header } from '#/components/compound/header';
import { CopyInviteCode } from '#/app/[locale]/ui/team/members/copyInviteCode';
import { League } from '#/components/compound/league';

export default async function Page({
  searchParams,
}: {
  searchParams: { team_id: string };
}) {
  const members = await getTeamMembers(Number(searchParams.team_id));

  const inviteCode = await createInviteCode(Number(searchParams.team_id));

  return (
    <div className="flex w-full flex-grow flex-col items-center gap-8">
      <Header withBackNavigation />
      <h1 className="text-4xl">Members</h1>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        {members.map((member) => (
          <Card key={member.id} className="flex w-full items-center gap-4">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage
                  src={member.emoji}
                  alt={member.telegram_username}
                />
                <AvatarFallback>{member.emoji}</AvatarFallback>
              </Avatar>
              <h3>@{member.telegram_username}</h3>
            </div>
            <div className="ml-auto">
              <League league={member.league} />
            </div>
            <p className="">{member.rp_total} 🏆</p>
          </Card>
        ))}
      </div>
      <CopyInviteCode code={inviteCode} />
    </div>
  );
}
