import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { SeasonProvider } from '@/components/season/provider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space',
})

// Load Geist with explicit weights to ensure proper font loading
const geist = GeistSans

export const metadata: Metadata = {
  title: 'Marketing & Data Professional',
  description: 'Portfolio showcasing data-driven marketing expertise',
  openGraph: {
    title: 'Marketing & Data Professional',
    description: 'Portfolio showcasing data-driven marketing expertise',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.className} ${spaceGrotesk.variable}`}>
      <body className="bg-black antialiased">
        <SeasonProvider>{children}</SeasonProvider>
      </body>
    </html>
  )
}
