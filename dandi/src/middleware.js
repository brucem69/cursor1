import { NextResponse } from 'next/server';

export async function middleware(request) {
  if (request.nextUrl.pathname === '/protected') {
    // W middleware nie mamy dostępu do localStorage, więc użyjemy cookies
    const apiKey = request.cookies.get('api-key');
    
    if (!apiKey) {
      return NextResponse.redirect(new URL('/playground', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/protected/:path*']
}; 