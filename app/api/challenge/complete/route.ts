import { NextRequest, NextResponse } from 'next/server';
import { completeChallengeActivities } from '#/domains/challenge/server/challenges';
import { mustSession } from '#/session';
import { CompletedChallengeActivities } from '#/domains/challenge/types';

export const POST = async (request: NextRequest) => {
  try {
    const session = await mustSession();
    const body = (await request.json()) as CompletedChallengeActivities;
    body.user_id = session.user_id;
    await completeChallengeActivities(body);

    return NextResponse.json({ message: 'Activities completed' });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
