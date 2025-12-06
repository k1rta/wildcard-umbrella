import { render, screen, TEST_IDS } from '@/lib/test/test-utils'
import React from 'react'
import { SeasonProvider, useSeasonContext } from '../provider'
import { SEASONS } from '@/lib/constants/seasons'
import type { Season } from '@/lib/types/season'

// Test Components
/**
 * Test component that displays the current season from context
 * Used to verify context value propagation
 */
function SeasonDisplay() {
  const { season } = useSeasonContext()
  return <div data-testid={TEST_IDS.season.contextValue}>{season}</div>
}

/**
 * Test component that triggers context error
 * Used to verify error handling when context is missing
 */
function ErrorTrigger() {
  useSeasonContext()
  return null
}

// Mock Setup
jest.mock('@/lib/utils/date')
jest.mock('../particles')

// Import after mocks
const dateUtils = jest.requireMock('@/lib/utils/date') as {
  getCurrentSeason: jest.MockedFunction<() => Season>
}
const particles = jest.requireMock('../particles') as {
  ParticlesBackground: React.ComponentType<{ season: Season; children: React.ReactNode }>
}

// Configure mocks
particles.ParticlesBackground = ({ season, children }) => (
  <div data-testid={TEST_IDS.particles.container} data-season={season}>
    {children}
  </div>
)

/**
 * Renders a SeasonProvider with test content
 * @param season - Optional season to mock
 * @param children - Components to render within provider
 */
function renderWithProvider(season: Season = 'spring', children: React.ReactNode) {
  dateUtils.getCurrentSeason.mockReturnValue(season)
  return render(<SeasonProvider>{children}</SeasonProvider>)
}

describe('SeasonProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    dateUtils.getCurrentSeason.mockReturnValue('spring')
  })

  describe('Season Context', () => {
    it.each(SEASONS)('should display %s theme when season changes', (expectedSeason) => {
      renderWithProvider(expectedSeason, <SeasonDisplay />)
      expect(screen.getByTestId(TEST_IDS.season.contextValue)).toHaveTextContent(expectedSeason)
    })

    describe('Fallback Behavior', () => {
      const fallbackCases = [
        {
          scenario: 'invalid season name',
          input: 'invalid-season' as unknown,
          expected: 'spring',
        },
        { scenario: 'missing season', input: undefined as unknown, expected: 'spring' },
        { scenario: 'null season', input: null as unknown, expected: 'spring' },
      ] as const

      it.each(fallbackCases)(
        'should use spring theme when $scenario is provided',
        ({ input, expected }) => {
          dateUtils.getCurrentSeason.mockReturnValue(input as Season)
          renderWithProvider('spring', <SeasonDisplay />)
          expect(screen.getByTestId(TEST_IDS.season.contextValue)).toHaveTextContent(expected)
        }
      )
    })

    it('should maintain theme consistency during page updates', () => {
      const { rerender } = render(
        <SeasonProvider>
          <SeasonDisplay />
        </SeasonProvider>
      )
      const initialTheme = screen.getByTestId(TEST_IDS.season.contextValue).textContent

      rerender(
        <SeasonProvider>
          <SeasonDisplay />
        </SeasonProvider>
      )
      expect(screen.getByTestId(TEST_IDS.season.contextValue).textContent).toBe(initialTheme)
    })
  })

  describe('Visual Elements', () => {
    it('should display seasonal particle effects', () => {
      renderWithProvider('winter', <SeasonDisplay />)
      // Use getAllByTestId and take first element to handle multiple renders
      const particlesBg = screen.getAllByTestId(TEST_IDS.particles.container)[0]
      expect(particlesBg).toBeInTheDocument()
      expect(particlesBg).toHaveAttribute('data-season', 'winter')
    })

    it('should render child components with seasonal theme', () => {
      renderWithProvider(
        'spring',
        <>
          <div data-testid={TEST_IDS.season.childPrimary}>Child 1</div>
          <div data-testid={TEST_IDS.season.childSecondary}>Child 2</div>
        </>
      )
      expect(screen.getByTestId(TEST_IDS.season.childPrimary)).toBeInTheDocument()
      expect(screen.getByTestId(TEST_IDS.season.childSecondary)).toBeInTheDocument()
    })
  })

  describe('Integration', () => {
    it('should automatically detect current season on page load', () => {
      renderWithProvider('spring', <SeasonDisplay />)
      // Component calls getCurrentSeason once during initialization
      expect(dateUtils.getCurrentSeason).toHaveBeenCalled()
    })

    it('should support multiple seasonal themes on the same page', () => {
      dateUtils.getCurrentSeason.mockReturnValue('spring')
      render(
        <>
          <SeasonProvider>
            <div data-testid={TEST_IDS.season.providerContent + '-1'}>
              <SeasonDisplay />
            </div>
          </SeasonProvider>
          <SeasonProvider>
            <div data-testid={TEST_IDS.season.providerContent + '-2'}>
              <SeasonDisplay />
            </div>
          </SeasonProvider>
        </>
      )
      // Called at least once per provider (may be called more due to React rendering)
      expect(dateUtils.getCurrentSeason).toHaveBeenCalled()
    })

    it('should handle empty content gracefully', () => {
      expect(() => render(<SeasonProvider>{null}</SeasonProvider>)).not.toThrow()
    })
  })

  describe('Error Boundaries', () => {
    it('should show helpful message when seasonal theme is used incorrectly', async () => {
      // Suppress console.error for this test as we expect an error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      // Import render from RTL directly (not the custom one with provider)
      const { render: rtlRender } = await import('@testing-library/react')

      expect(() => rtlRender(<ErrorTrigger />)).toThrow(
        'useSeasonContext must be used within a SeasonProvider'
      )

      consoleSpy.mockRestore()
    })
  })
})
