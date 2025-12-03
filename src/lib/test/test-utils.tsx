import type { ReactElement } from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { SeasonProvider } from '@/components/season/provider'
import type { Season } from '@/lib/types/season'

// Mock date utils globally
jest.mock('@/lib/utils/date', () => ({
  getCurrentSeason: jest.fn().mockReturnValue('spring'),
  getMonthName: jest.fn(),
}))

/**
 * Test ID constants - single source of truth
 */
export const TEST_IDS = {
  season: {
    contextValue: 'season-context-value',
    providerContent: 'season-provider-content',
    childPrimary: 'season-child-primary',
    childSecondary: 'season-child-secondary',
  },
  particles: {
    container: 'particles-background-container',
  },
} as const

/**
 * Custom render with SeasonProvider wrapper
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  season?: Season
}

export function render(ui: ReactElement, { season, ...options }: CustomRenderOptions = {}) {
  if (season) {
    const dateUtils = jest.requireMock('@/lib/utils/date')
    dateUtils.getCurrentSeason.mockReturnValue(season)
  }
  return rtlRender(ui, { wrapper: SeasonProvider, ...options })
}

// Re-export everything else from RTL
export * from '@testing-library/react'
export { render as default }
