import Script from 'next/script'
import { Urbanist, Archivo } from 'next/font/google'

import './site.css'

const urbanist = Urbanist({ subsets: ['latin'], display: 'swap', variable: '--f-text' })
const archivo = Archivo({ subsets: ['latin'], display: 'swap', axes: ['wdth'], variable: '--f-caps' })

const GA_ID = 'G-DJJZSS3LVE'
const description = 'Red latinoamericana de Asambleas Climáticas: 200 personas sorteadas en Bujarú, Buenaventura, Mar del Plata y Nuevo León deliberaron y entregaron recomendaciones a sus gobiernos.'

export const metadata = {
  metadataBase: new URL('https://resurgentes.org'),
  title: { default: '(re)surgentes, Asambleas Climáticas', template: '%s | (re)surgentes' },
  description,
  openGraph: { description, images: '/images/share-landing.png', type: 'website' },
  twitter: { card: 'summary_large_image', images: { url: '/images/share-landing.png', alt: '(re)surgentes' } },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${urbanist.variable} ${archivo.variable}`}>
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
