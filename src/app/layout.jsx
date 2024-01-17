import { Providers } from '@/store/provider'
import { Karla } from 'next/font/google'
import '@fortawesome/fontawesome-svg-core/styles.css'


import './themes.scss'


import Navbar from "@/components/layout/navbar"
import Footer from '@/components/layout/footer'
import Overlay from '@/components/common/overlay'
import { createTheme } from '@mui/material'
import { AuthProvider } from '@/context/auth-context'
import { LandingProvider } from '@/context/landing-context'
import Message from '@/components/common/message'


const karla = Karla({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})
export const metadata = {
  title: 'Asambleas climaticas',
  description: 'Generated by Next.js',
}

export default function RootLayout({ children }) {

  return (
    <html lang="es" className={karla.className}>
      <body>
        <Providers>
          <LandingProvider>
            <AuthProvider>
              <Navbar />
              <main>
                {children}
              </main>
              <Footer />
              <Message/>
            </AuthProvider>

          </LandingProvider>
        </Providers>
      </body>
    </html>
  )
}
