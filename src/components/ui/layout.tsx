'use client'

import { Footer } from './footer'
import { TEST_IDS } from '@/lib/constants/test-ids'

/**
 * Props for the PageLayout component
 * @typedef PageLayoutProps
 */
export type PageLayoutProps = {
  /** Content to be rendered in the main section */
  readonly children: React.ReactNode
  /** Optional CSS classes for the main section */
  readonly className?: string
}

/**
 * A page layout component with a centered main section and footer.
 * Uses semantic HTML elements (main, footer) with proper ARIA roles.
 *
 * @param props - {@link PageLayoutProps}
 * @returns React element
 */
export function PageLayout({ children, className = '' }: PageLayoutProps): JSX.Element {
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
