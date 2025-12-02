/* eslint-disable react/display-name */
import { screen } from '@testing-library/react'
import { render } from '@testing-library/react'
import { SeasonProvider, useSeasonContext } from '../provider'
import { SEASONS } from '@/lib/constants/seasons'
import type { Season } from '@/lib/types/season'

// Test components
function TestComponent() {
  const { season } = useSeasonContext()
  return <div data-testid="season">{season}</div>
}

function ErrorComponent() {
  useSeasonContext()
  return null
}

// Mock setup
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
dateUtils.getCurrentSeason.mockReturnValue('spring')
particles.ParticlesBackground = ({ season, children }) => (
  <div data-testid="particles-bg" data-season={season}>
    {children}
  </div>
)

describe('SeasonProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    dateUtils.getCurrentSeason.mockReturnValue('spring')
  })

  describe('context value', () => {
    describe('valid seasons', () => {
      it.each(SEASONS)('should provide %s season to children', (expectedSeason) => {
        dateUtils.getCurrentSeason.mockReturnValue(expectedSeason)
        render(
          <SeasonProvider>
            <TestComponent />
          </SeasonProvider>
        )
        expect(screen.getByTestId('season')).toHaveTextContent(expectedSeason)
      })
    })

    describe('error handling', () => {
      const invalidCases = [
        {
          input: 'invalid-season' as unknown,
          expected: 'spring',
          description: 'handles invalid season',
        },
        { input: undefined as unknown, expected: 'spring', description: 'handles undefined' },
        { input: null as unknown, expected: 'spring', description: 'handles null' },
      ] as const

      it.each(invalidCases)(
        'when getCurrentSeason returns ${input}, defaults to ${expected} (${description})',
        ({ input, expected }) => {
          // We need to cast here because we're testing invalid inputs
          dateUtils.getCurrentSeason.mockReturnValue(input as Season)
          render(
            <SeasonProvider>
              <TestComponent />
            </SeasonProvider>
          )
          expect(screen.getByTestId('season')).toHaveTextContent(expected)
        }
      )
    })
  })

  describe('component rendering', () => {
    it('should render ParticlesBackground with correct season', () => {
      dateUtils.getCurrentSeason.mockReturnValue('winter')
      render(
        <SeasonProvider>
          <div>Child</div>
        </SeasonProvider>
      )

      const particles = screen.getByTestId('particles-bg')
      expect(particles).toHaveAttribute('data-season', 'winter')
    })

    it('should render children correctly', () => {
      const childText = 'Test Child'
      render(
        <SeasonProvider>
          <div data-testid="child">{childText}</div>
        </SeasonProvider>
      )

      expect(screen.getByTestId('child')).toHaveTextContent(childText)
    })
  })

  describe('error handling', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test as we expect an error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      expect(() => {
        render(<ErrorComponent />)
      }).toThrow('useSeasonContext must be used within a SeasonProvider')

      consoleSpy.mockRestore()
    })
  })
})
