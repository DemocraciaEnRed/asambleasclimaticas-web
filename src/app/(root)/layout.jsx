import Shell from '@/lib/shell'

export const metadata = {
  metadataBase: new URL('https://resurgentes.org'),
  title: '(re)surgentes, Asambleas Climáticas',
}

// Solo envuelve "/", que manda a cada visitante a su idioma.
export default function RootLayout({ children }) {
  return <Shell lang="es">{children}</Shell>
}
