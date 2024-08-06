import { Karla } from 'next/font/google'
import '@fortawesome/fontawesome-svg-core/styles.css'


import './themes.scss'

import Navbar from "@/components/layout/navbar"
import Footer from '@/components/layout/footer'
import AuthContextProvider from '@/context/auth-context'
import Message from '@/components/common/message'
import { AlertProvider } from '@/context/alert-context'
import { LanguageProvider } from '@/context/lang-context'
import { Providers } from '@/store/provider'
import HelpButton from "@/components/layout/help-button";
import GoogleAnalytics from '@/components/common/google-analytics'


const karla = Karla({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})
export const metadata = {
  title: 'Resurgente Pacto-interciudad',
  description: 'Participa en la co-creación del pacto Inter-ciudad, y conoce las máximas elaboradas en las Asambleas Climáticas de Brasil, Argentina, Colombia y Mexico.',
}

export default function RootLayout({ children }) {

  return (
    <html lang="es" className={karla.className}>
      <body>
        <GoogleAnalytics ga_id="G-S16X1Z9SQL" />
        <Providers>
          <AuthContextProvider>
            <AlertProvider>
              <LanguageProvider>
                <Navbar />
                <main>{children}</main>
                <HelpButton />
                <Footer />
                <Message />
              </LanguageProvider>
            </AlertProvider>
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  );
}
