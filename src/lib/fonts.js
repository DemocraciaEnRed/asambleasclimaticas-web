import { Urbanist, Archivo } from 'next/font/google'

// Urbanist: geométrica y redonda como el logo. Archivo al 125% de ancho: las mayúsculas espaciadas del logo.
// Compartidas por el sitio público y el backoffice, que tienen layouts raíz separados.
export const urbanist = Urbanist({ subsets: ['latin'], display: 'swap', variable: '--f-text' })
export const archivo = Archivo({ subsets: ['latin'], display: 'swap', axes: ['wdth'], variable: '--f-caps' })

export const fontClasses = `${urbanist.variable} ${archivo.variable}`
