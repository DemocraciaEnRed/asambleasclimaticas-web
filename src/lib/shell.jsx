import Script from 'next/script'
import { fontClasses } from '@/lib/fonts'

import '@/app/site.css'

const GA_ID = 'G-DJJZSS3LVE'

// La estructura <html> que comparten ambos layouts raíz, para que cada idioma declare su propio lang.
export default function Shell({ lang, children }) {
  return (
    <html lang={lang} className={fontClasses}>
      <body>
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
      </body>
    </html>
  )
}
