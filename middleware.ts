import { NextRequest, NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
import { authorizeUser } from '#/domains/user/server/sessions';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/ui', request.nextUrl));
  }

  if (
    request.nextUrl.pathname === '/api/auth/telegram' ||
    request.nextUrl.pathname === '/api/webhook/telegram'
  ) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith('/api')) {
    try {
      await authorizeUser();
      return NextResponse.next();
    } catch (e) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: ['/ui(.*)', '/', '/api(.*)', '/auth(.*)'],
};
