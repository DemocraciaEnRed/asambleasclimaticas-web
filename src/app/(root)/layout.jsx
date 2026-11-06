import Shell from '@/lib/shell'

export const metadata = {
  metadataBase: new URL('https://resurgentes.org'),
  title: '(re)surgentes, Asambleas Climáticas',
}

// Only wraps "/", which sends each visitor to their language.
export default function RootLayout({ children }) {
  return <Shell lang="es">{children}</Shell>
}
