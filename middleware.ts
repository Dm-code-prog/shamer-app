// This function can be marked `async` if using `await` inside
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/ui', request.nextUrl).toString());
  }
}

export const config = {
  matcher: ['/', '/ui(.*)'],
};
