import { NextRequest, NextResponse } from 'next/server';
import {
  UseInviteCodeRequest,
  UseInviteCodeSchema,
} from '#/domains/user/types';
import { applyInviteCode } from '#/domains/team/server/teams';
import { authorizeUser } from '#/domains/user/server/sessions';

export const POST = async (req: NextRequest) => {
  const user = await authorizeUser();

  const body = await req.json();
  try {
    UseInviteCodeSchema.parse(body);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const request = body as UseInviteCodeRequest;
  try {
    const teamID = await applyInviteCode({
      invite_code: request.invite_code,
      user_id: user.id,
    });
    return NextResponse.json({ team_id: teamID });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
