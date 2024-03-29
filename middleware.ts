import { NextRequest, NextResponse } from 'next/server';
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18nConfig';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/ui', request.nextUrl));
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: ['/ui(.*)', '/api(.*)', '/'],
};
