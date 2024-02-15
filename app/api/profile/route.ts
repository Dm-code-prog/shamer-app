import { NextRequest, NextResponse } from 'next/server';
import { mustSession } from '#/session';
import { getUserInfo, setUserInfo } from '#/data/user_info';

export const GET = async (req: NextRequest) => {
  const { user_id } = await mustSession();

  try {
    const { weight, height, age } = await getUserInfo(user_id);
    return NextResponse.json({ weight, height, age });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const { user_id } = await mustSession();
  const { weight, height, age } = await req.json();

  try {
    await setUserInfo({ user_id, weight, height, age });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
};
