// This function can be marked `async` if using `await` inside
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '#/data/sessions';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/ui', request.nextUrl).toString());
  }

  const shamerSession = cookies().get('shamer_session');
  if (!shamerSession) {
    return NextResponse.redirect(
      new URL('/auth/telegram', request.nextUrl).toString(),
    );
  }

  const userID = await getSession(shamerSession.value);

  if (!userID) {
    return NextResponse.redirect(
      new URL('/auth/telegram', request.nextUrl).toString(),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/ui(.*)'],
};
