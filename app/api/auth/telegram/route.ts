import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  if (!body.initData) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      { status: 401 },
    );
  }

  const { initData } = body;

  console.log(initData, 'Telegram init data');
  return NextResponse.json(
    {
      error: 'Unauthorized',
    },
    { status: 401 },
  );
};
