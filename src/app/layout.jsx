import { Providers } from '@/store/provider'
import { Karla } from 'next/font/google'
import '@fortawesome/fontawesome-svg-core/styles.css'


import '@/app/themes.scss'


import Overlay from '@/app/_components/common/overlay'
import { createTheme } from '@mui/material'
import Navbar from '@/app/_components/layout/navbar'
import Footer from '@/app/_components/layout/footer'
import GoogleAnalytics from "@/app/_components/common/google-analytics";

const karla = Karla({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})
export const metadata = {
  metadataBase: new URL('https://resurgentes.org'),
  title: 'Resurgente Pacto-interciudad',
  description: 'Participa en la co-creación del pacto Inter-ciudad, y conoce las máximas elaboradas en las Asambleas Climáticas de Brasil, Argentina, Colombia y Mexico.',
  openGraph:{
    title: 'Resurgente Pacto-interciudad',
    description: 'Participa en la co-creación del pacto Inter-ciudad, y conoce las máximas elaboradas en las Asambleas Climáticas de Brasil, Argentina, Colombia y Mexico.',
    images:  'https://resurgentes.org/images/share-landing.png',
    type: 'website',
  },
  twitter:{
    title: 'Resurgente Pacto-interciudad',
    description: 'Participa en la co-creación del pacto Inter-ciudad, y conoce las máximas elaboradas en las Asambleas Climáticas de Brasil, Argentina, Colombia y Mexico.',
    images:  {
      url:'https://resurgentes.org/images/share-landing.png',
      alt:'banner resurgentes'
    },
    type: 'website',
  }
  
}

export default function RootLayout({ children}) {

  return (
    <html lang="es" className={karla.className}>
      <body>
        <GoogleAnalytics ga_id="G-DJJZSS3LVE"/>
        <Providers>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <Overlay />
        </Providers>
      </body>
    </html>
  )
}
