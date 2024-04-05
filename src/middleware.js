import { NextResponse } from "next/server";
import { ADMIN_PROTECTED_ROUTE, API_URL, AUTHOR_PROTECTED_ROUTES, AUTH_TOKENS_KEY } from "./utils/constants";



// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const authTokens = request.cookies.get(AUTH_TOKENS_KEY);
  let user;
  if(authTokens){
    const baseURL= API_URL
    const resp = await fetch(baseURL+'/users/me',{headers:{'Authorization' : 'Bearer ' + authTokens.value}})
    const data = await resp.json()
    user = await data.user
  }

  //redirect if user is not admin in '/admin' routes
  if (request.nextUrl.pathname.startsWith(ADMIN_PROTECTED_ROUTE) ) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    if(!authTokens || (user && user.role !== 'admin') ){
      response.cookies.delete(AUTH_TOKENS_KEY);
      return response;
    }
  }

  //redirect if user is not admin or author in ['/nuevo','/editar','/nueva-version','/estadisticas']
  if (AUTHOR_PROTECTED_ROUTES.some(route => request.nextUrl.pathname.includes(route) ) ) {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    if(!authTokens || (user && user.role !== 'admin' && user.role !== 'admin' && user.role !== 'author') ){
      response.cookies.delete(AUTH_TOKENS_KEY);
      return response;
    }
  }

  //redirect if user exist in  '/auth' routes
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