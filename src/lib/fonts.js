import { Urbanist, Archivo } from 'next/font/google'

// Urbanist: geometric and round like the logo. Archivo at 125% width: the tracked caps of the lockup.
// Shared by the public site and the back office, which have separate root layouts.
export const urbanist = Urbanist({ subsets: ['latin'], display: 'swap', variable: '--f-text' })
export const archivo = Archivo({ subsets: ['latin'], display: 'swap', axes: ['wdth'], variable: '--f-caps' })

export const fontClasses = `${urbanist.variable} ${archivo.variable}`
