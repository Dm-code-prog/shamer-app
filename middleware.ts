import { NextRequest, NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';
import { authorizeUser } from '#/domains/user/server/sessions';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/ui', request.nextUrl));
  }

  if (request.nextUrl.pathname.includes('/api')) {
    await authorizeUser();
    return NextResponse.next();
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: ['/ui(.*)', '/', '/api(.*)'],
};
