import { NextRequest, NextResponse } from 'next/server';

import { mustSession } from '#/session';
import { createTeam } from '#/data/teams';

export const POST = async (req: NextRequest) => {
  try {
    const { user_id } = await mustSession();
    const { name, description } = await req.json();
    await createTeam({ owner_id: user_id, name, description });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
