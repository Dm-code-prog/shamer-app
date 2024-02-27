import { NextRequest, NextResponse } from 'next/server';

import { mustSession } from '#/session';
import { createTeam } from '#/domains/team/server/teams';

export const POST = async (req: NextRequest) => {
  try {
    const { user_id } = await mustSession();
    const { name, description } = await req.json();
    const id = await createTeam({ owner_id: user_id, name, description });
    return NextResponse.json({ team: { id } });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
