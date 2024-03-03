import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '#/domains/user/server/sessions';

export async function middleware(request: NextRequest) {
  const user = await getSession();
  if (!user) {
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
