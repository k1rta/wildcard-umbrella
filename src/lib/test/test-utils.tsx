import type { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { SeasonProvider } from '@/components/season/provider'
import type { Season } from '@/lib/types/season'

// Mock getCurrentSeason by default
jest.mock('@/lib/utils/date', () => ({
  getCurrentSeason: jest.fn().mockReturnValue('spring'),
  getMonthName: jest.fn(),
}))

/**
 * Interface for extended render options
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Optional season to override the default 'spring' */
  season?: Season
}

/**
 * Custom render function that wraps components with necessary providers
 * @param ui - Component to render
 * @param options - Additional render options including custom season
 * @returns RenderResult with additional utilities
 */
function customRender(ui: ReactElement, { season, ...options }: CustomRenderOptions = {}) {
  if (season) {
    const dateUtils = jest.requireMock('@/lib/utils/date')
    dateUtils.getCurrentSeason.mockReturnValue(season)
  }

  return render(ui, { wrapper: SeasonProvider, ...options })
}

/**
 * Helper function to override the current season for specific tests
 * @param season - The season to set
 */
export function setCurrentSeason(season: Season): void {
  const dateUtils = jest.requireMock('@/lib/utils/date')
  dateUtils.getCurrentSeason.mockReturnValue(season)
}

/**
 * Helper function to reset the season to default (spring)
 */
export function resetSeason(): void {
  const dateUtils = jest.requireMock('@/lib/utils/date')
  dateUtils.getCurrentSeason.mockReturnValue('spring')
}

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }
export type { CustomRenderOptions }
