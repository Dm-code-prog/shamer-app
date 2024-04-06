import { NextRequest, NextResponse } from 'next/server';

import { verifyTelegramHmac } from '#/app/api/auth/telegram/hmac';
import { saveTelegramUser } from '#/domains/user/server/users';
import { createSession } from '#/domains/user/server/sessions';
import { cookies } from 'next/headers';
import { joinTeam } from '#/domains/team/server/teams';

const SHAMER_TEAM_ID = 33;

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  if (!body.initData) {
    return NextResponse.json(
      {
        error: 'Bad request',
      },
      { status: 400 },
    );
  }

  const { initData } = body;
  const ok = verifyTelegramHmac(initData);

  console.log('debug initData:', initData, ok);

  if (!ok) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      { status: 401 },
    );
  }

  const params = new URLSearchParams(initData);

  const user = params.get('user');
  if (!user) {
    console.error('No user data in telegram response');
    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      { status: 500 },
    );
  }

  const userJSONObject = JSON.parse(user);

  const externalID = userJSONObject.id;
  const firstName = userJSONObject.first_name;
  const lastName = userJSONObject.last_name;
  const telegramUsername = userJSONObject.username;

  if (!externalID || !telegramUsername) {
    console.error('Invalid user data', userJSONObject);
    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      { status: 400 },
    );
  }

  try {
    const id = await saveTelegramUser({
      externalID,
      firstName,
      lastName,
      telegramUsername,
    });

    const token = await createSession(id);

    cookies().set('shamer_session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
    });

    try {
      await joinTeam(SHAMER_TEAM_ID, id);
    } catch (e) {
      console.error(
        `Failed to join user ${id} to the public team. Perhaps because the user is already a member`,
        e,
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: 'Telegram user authorized',
      },
      { status: 200 },
    );
  } catch (e) {
    console.error('/api/auth/telegram', e);
    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      { status: 500 },
    );
  }
};
