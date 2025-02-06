import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  if (request.nextUrl.pathname === '/protected') {
    // W middleware nie mamy dostępu do localStorage, więc użyjemy cookies
    const apiKey = request.cookies.get('api-key');
    
    if (!apiKey) {
      return NextResponse.redirect(new URL('/playground', request.url));
    }
  }

  // Sprawdź czy to chroniona ścieżka
  if (request.nextUrl.pathname === '/api-keys') {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api-keys', '/protected/:path*']
}; 