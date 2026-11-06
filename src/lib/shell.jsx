import Script from 'next/script'
import { Urbanist, Archivo } from 'next/font/google'

import '@/app/site.css'

// Urbanist: geometric and round like the logo. Archivo at 125% width: the tracked caps of the lockup.
const urbanist = Urbanist({ subsets: ['latin'], display: 'swap', variable: '--f-text' })
const archivo = Archivo({ subsets: ['latin'], display: 'swap', axes: ['wdth'], variable: '--f-caps' })

const GA_ID = 'G-DJJZSS3LVE'

// The <html> shell shared by both root layouts, so each language declares its own lang.
export default function Shell({ lang, children }) {
  return (
    <html lang={lang} className={`${urbanist.variable} ${archivo.variable}`}>
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
