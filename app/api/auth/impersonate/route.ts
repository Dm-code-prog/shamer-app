import { createSession } from '#/domains/user/server/sessions';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const token = await createSession('b90ee37f-4cb3-4a3a-ac98-4a91ad2166ce');

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
