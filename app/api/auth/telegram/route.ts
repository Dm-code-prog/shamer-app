import { NextRequest, NextResponse } from 'next/server';

import crypto from 'crypto';

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

  const params = new URLSearchParams(initData);
  const hash = params.get('hash');

  const fields = Array.from(params.keys()).filter((k) => k !== 'hash');

  // Sort fields alphabetically and format them
  const dataCheckString = fields
    .sort()
    .map((key) => `${key}=${params.get(key)}`)
    .join('\n');

  // Calculate the secret key
  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(process.env.TELEGRAM_TOKEN!)
    .digest();

  // Calculate HMAC-SHA-256 signature of the data-check-string with the secret key
  const hmac = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');
  if (hmac !== hash) {
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
