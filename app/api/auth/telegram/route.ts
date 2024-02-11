import { NextRequest, NextResponse } from 'next/server';

import crypto from 'crypto';
import { verifyTelegramHmac } from '#/app/api/auth/telegram/hmac';

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

  // debug
  console.log('Telegram initData =', initData);

  if (!ok) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      { status: 401 },
    );
  }
  return NextResponse.json(
    {
      ok: true,
      message: 'Telegram user authorized',
    },
    { status: 200 },
  );
};
