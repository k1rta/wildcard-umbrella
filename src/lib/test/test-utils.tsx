import type { ReactElement } from 'react'
import { render as rtlRender, RenderOptions, act as rtlAct } from '@testing-library/react'
import { SeasonProvider } from '@/components/season/provider'
import type { Season } from '@/lib/types/season'

// Re-export test IDs from constants
export { TEST_IDS } from '@/lib/constants/test-ids'

/**
 * Custom render with SeasonProvider wrapper
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  season?: Season
}

export function render(ui: ReactElement, { season, ...options }: CustomRenderOptions = {}) {
  if (season && typeof jest !== 'undefined') {
    const dateUtils = jest.requireMock('@/lib/utils/date')
    dateUtils.getCurrentSeason.mockReturnValue(season)
  }
  return rtlRender(ui, { wrapper: SeasonProvider, ...options })
}

/**
 * Re-export act with proper async handling
 */
export async function act(callback: () => Promise<void> | void): Promise<void> {
  await rtlAct(async () => {
    await callback()
  })
}

/**
 * Safely test component rendering errors
 * @example
 * expect(() => renderWithError(<ErrorComponent />)).toThrow('Expected error')
 */
export function renderWithError(ui: ReactElement, options?: CustomRenderOptions) {
  try {
    render(ui, options)
  } catch (error) {
    throw error
  }
}

// Re-export everything else from RTL
export * from '@testing-library/react'
export { render as default }
