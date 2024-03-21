import { NextResponse } from "next/server";
import { API_URL } from "./utils/constants";

const AUTH_TOKENS_KEY = "RES_AUTH";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const authTokens = request.cookies.get(AUTH_TOKENS_KEY);
  //const response = NextResponse.redirect(new URL("/auth/login", request.url));
  //const user = await fetch('/users/me',{hea})
  let user;
  if(authTokens){
    const baseURL= API_URL
    const resp = await fetch(baseURL+'/users/me',{headers:{'Authorization' : 'Bearer ' + authTokens.value}})
    const data = await resp.json()
    user = await data.user
  }
  if (request.nextUrl.pathname.startsWith("/admin") ) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    if(!authTokens || (user && user.role !== 'admin') ){
      response.cookies.delete(AUTH_TOKENS_KEY);
      return response;
    }
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