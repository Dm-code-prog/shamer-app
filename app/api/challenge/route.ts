import { NextRequest, NextResponse } from 'next/server';
import { createChallenge } from '#/domains/challenge/server/challenges';
import {
  Challenge,
  CreateChallengeRequestSchema,
} from '#/domains/challenge/types';

export const POST = async (request: NextRequest) => {
  try {
    let body;
    try {
      body = (await request.json()) as Challenge;
      CreateChallengeRequestSchema.parse(body);
    } catch (e) {
      return NextResponse.json({ error: e }, { status: 400 });
    }

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
