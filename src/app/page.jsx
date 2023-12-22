'use client'
import { useEffect, useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Page(){
    const router = useRouter();
    const pathname = usePathname()

  useLayoutEffect(() => {
    // Detect the browser's preferred language
    const browserLang = navigator.language || navigator.userLanguage;
    const supportedLocales = ['es', 'pt'];
    let detectedLocale = 'es'; // fallback to 'en-US' if the browser's language is not supported
    
    if (supportedLocales.includes(browserLang.split('-')[0])) {
        detectedLocale = browserLang.split('-')[0];
    }

    // If the user hits the root path, redirect based on the browser's language
    
    console.log(pathname);
    if (pathname === '/') {
      router.replace(`/${detectedLocale}`);
    }
  }, []);
    return(
    <div>

    </div>
    )
}