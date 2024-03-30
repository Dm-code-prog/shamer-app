import { NextRequest, NextResponse } from 'next/server';
import { JoinTeamRequest } from '#/domains/team/types';
import { joinTeam } from '#/domains/team/server/teams';
import { authorizeUser } from '#/domains/user/server/sessions';

export const PUT = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as JoinTeamRequest;
    const user = await authorizeUser();

    await joinTeam(body.team_id, user.id);

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
