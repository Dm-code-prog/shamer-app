// This function can be marked `async` if using `await` inside
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserDataBySessionToken } from '#/domains/user/server/sessions';
import { getSession } from '#/session';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(
      new URL('/auth/telegram', request.nextUrl).toString(),
    );
  }

  const { user_id } = session;

  if (!user_id) {
    return NextResponse.redirect(
      new URL('/auth/telegram', request.nextUrl).toString(),
    );
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/ui/', request.nextUrl).toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/ui(.*)', '/start(.*)'],
};
