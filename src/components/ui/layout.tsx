'use client'

import { Footer } from './footer'
import { TEST_IDS } from '@/lib/constants/test-ids'

type PageLayoutProps = {
  children: React.ReactNode
  className?: string
}

export function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative z-10" data-testid={TEST_IDS.page.layout}>
      <main
        className={`flex-1 flex flex-col items-center justify-center px-6 py-16 sm:px-8 ${className}`}
      >
        <div className="w-full max-w-4xl flex flex-col items-center justify-center gap-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
