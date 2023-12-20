import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'


let defaultLocale = 'es'
let locales = ['es', 'pt']

// Get the preferred locale, similar to the above or using a library
function getLocale(request) {
    const acceptedLanguage = request.headers.get('accept-language')
    let headers = { 'accept-language': acceptedLanguage }
    let languages = new Negotiator({ headers }).languages()
    console.log(languages);
    return match(languages, locales, defaultLocale) // -> 'en-US'
}

export function middleware(request) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Redirect if there is no locale
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return Response.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next, assets,api)
        '/((?!api|assets|.*\\..*|_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
}