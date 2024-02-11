import { NextRequest, NextResponse } from 'next/server';

import crypto from 'crypto';
import { verifyTelegramHmac } from '#/app/api/auth/telegram/hmac';
import { saveTelegramUser } from '#/data/users';
import { createSession } from '#/data/sessions';
import { cookies } from 'next/headers';

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

  if (!externalID || !firstName || !lastName || !telegramUsername) {
    return NextResponse.json(
      {
        error: 'Internal server error',
      },
      { status: 500 },
    );
  }

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

  return NextResponse.json(
    {
      ok: true,
      message: 'Telegram user authorized',
    },
    { status: 200 },
  );
};
