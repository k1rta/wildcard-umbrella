'use client'

import { Footer } from './footer'
import { TEST_IDS } from '@/lib/constants/test-ids'
import { cn } from '@/lib/utils/cn'

export type PageLayoutProps = {
  readonly children: React.ReactNode
  readonly className?: string
}

export function PageLayout({ children, className = '' }: PageLayoutProps): React.ReactElement {
  return (
    <div className="min-h-screen flex flex-col relative z-10" data-testid={TEST_IDS.page.layout}>
      <main
        className={cn(
          'flex-1 flex flex-col items-center justify-center',
          'px-4 sm:px-6 lg:px-8',
          'py-16',
          'max-w-5xl mx-auto w-full',
          'gap-8',
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}
