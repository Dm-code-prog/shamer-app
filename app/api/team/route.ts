import { NextRequest, NextResponse } from 'next/server';

import { createTeam } from '#/domains/team/server/teams';
import { mustUser } from '#/domains/user/server/sessions';

export const POST = async (req: NextRequest) => {
  try {
    const { id: user_id } = await mustUser();
    const { name, description, emoji, is_public } = await req.json();
    const id = await createTeam({
      user_id,
      name,
      description,
      is_public,
      emoji: emoji || '🏆',
    });
    return NextResponse.json({ team: { id } });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
