import { NextRequest, NextResponse } from 'next/server';
import { authorizeUser } from '#/domains/user/server/sessions';
import { setUserInfo } from '#/domains/user/server/user_info';

export const PUT = async (req: NextRequest) => {
  const { id } = await authorizeUser();
  const { weight, height, age } = await req.json();

  try {
    await setUserInfo({ user_id: id, weight, height, age });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
};
