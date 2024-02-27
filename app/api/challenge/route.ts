import { NextRequest, NextResponse } from 'next/server';
import { createChallenge } from '#/domains/challenge/server/challenges';
import { CreateChallengeInfo } from '#/domains/challenge/types';

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as CreateChallengeInfo;
    const id = await createChallenge(body);
    return NextResponse.json({ id }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};
