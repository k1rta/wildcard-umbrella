import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react'
import { ReactElement } from 'react'
import { SeasonProvider } from '@/components/season/provider'

/**
 * Custom render that wraps components with all necessary providers
 */
function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <SeasonProvider>{children}</SeasonProvider>
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react'

// Export custom render (overrides default)
export { render }

// Export user event
export { default as userEvent } from '@testing-library/user-event'

// Export TEST_IDS for convenience
export { TEST_IDS } from '@/lib/constants/test-ids'
