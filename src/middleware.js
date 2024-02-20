import { NextResponse } from "next/server";

const AUTH_TOKENS_KEY = "RES_AUTH";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const authTokens = request.cookies.get(AUTH_TOKENS_KEY);

  //const response = NextResponse.redirect(new URL("/auth/login", request.url));
  if (request.nextUrl.pathname.startsWith("/admin") && !authTokens) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete(AUTH_TOKENS_KEY);
    return response;
  }
  if (authTokens && request.nextUrl.pathname.startsWith("/auth")) {
    const response = NextResponse.redirect(new URL("/", request.url));
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};