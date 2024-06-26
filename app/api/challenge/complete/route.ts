import { NextRequest, NextResponse } from 'next/server';
import { authorizeUser } from '#/domains/user/server/sessions';
import { CompleteChallengeActivityRequest } from '#/domains/challenge/types';
import { completeActivities } from '#/domains/challenge/server/challenges';
import { handleAPIRouteError } from '#/app/api/error-handler';

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  try {
    const user = await authorizeUser();

    if (!user.user_info_is_filled) {
      return NextResponse.json(
        {
          error:
            'Your profile is not filled in. Please fill in your profile before completing activities.',
        },
        { status: 400 },
      );
    }

    const req = body as CompleteChallengeActivityRequest;
    await completeActivities({
      user_id: user.id,
      challenge_instance_id: req.challenge_instance_id,
      activity_ids: req.activity_ids,
    });
    return NextResponse.json({ message: 'Activities completed' });
  } catch (e) {
    handleAPIRouteError(e, body, '/challenge/complete');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
