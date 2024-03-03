import { NextRequest, NextResponse } from 'next/server';
import { mustUser } from '#/domains/user/server/sessions';
import { CompleteChallengeActivityRequest } from '#/domains/challenge/types';
import { completeActivities } from '#/domains/challenge/server/challenges';

export const POST = async (request: NextRequest) => {
  try {
    const user = await mustUser();
    const body = (await request.json()) as CompleteChallengeActivityRequest;
    await completeActivities({
      user_id: user.id,
      challenge_instance_id: body.challenge_instance_id,
      activity_ids: body.activity_ids,
    });
    return NextResponse.json({ message: 'Activities completed' });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
