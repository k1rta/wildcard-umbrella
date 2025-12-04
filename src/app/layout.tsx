import type { Metadata } from 'next'
import * as React from 'react'
import { GeistSans } from 'geist/font/sans'
import { SeasonProvider } from '@/components/season/provider'
import { Footer } from '@/components/ui/footer'
import './globals.css'

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
    <html lang="en" className={geist.className}>
      <body className="bg-black antialiased min-h-screen flex flex-col">
        <SeasonProvider>
          <main className="flex-1">{children}</main>
          <Footer />
        </SeasonProvider>
      </body>
    </html>
  )
}
