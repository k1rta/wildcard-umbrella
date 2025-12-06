import { render, screen, TEST_IDS } from '@/lib/test/test-utils'
import { Title } from '../title'
import type { Season } from '@/lib/types/season'

// Mock Setup
jest.mock('@/lib/utils/date')

const dateUtils = jest.requireMock('@/lib/utils/date') as {
  getCurrentSeason: jest.MockedFunction<() => Season>
}

describe('Title', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    dateUtils.getCurrentSeason.mockReturnValue('spring')
  })

  describe('Rendering', () => {
    it('should render children content', () => {
      render(<Title>Test Title</Title>)
      const title = screen.getByTestId(TEST_IDS.ui.title)
      expect(title).toHaveTextContent('Test Title')
    })

    it('should apply custom className', () => {
      render(<Title className="custom-class">Styled Title</Title>)
      const title = screen.getByTestId(TEST_IDS.ui.title)
      expect(title).toHaveClass('custom-class')
    })

    it('should render as h1 heading', () => {
      render(<Title>Heading</Title>)
      const heading = screen.getByTestId(TEST_IDS.ui.title)
      expect(heading).toHaveAttribute('role', 'heading')
      expect(heading).toHaveAttribute('aria-level', '1')
      expect(heading).toHaveTextContent('Heading')
    })
  })

  describe('Season Gradients', () => {
    const gradientTests = [
      {
        season: 'spring' as Season,
        gradient: 'from-fuchsia-400 via-purple-400 to-violet-400',
        description: 'Vibrant spring flowers',
      },
      {
        season: 'summer' as Season,
        gradient: 'from-amber-500 via-yellow-500 to-orange-500',
        description: 'Warm summer sunset (7:1 contrast)',
      },
      {
        season: 'autumn' as Season,
        gradient: 'from-amber-500 via-orange-400 to-rose-400',
        description: 'Rich autumn leaves',
      },
      {
        season: 'winter' as Season,
        gradient: 'from-cyan-300 via-blue-400 to-indigo-400',
        description: 'Cool winter ice',
      },
    ]

    it.each(gradientTests)(
      'should apply $season gradient ($description)',
      ({ season, gradient }) => {
        dateUtils.getCurrentSeason.mockReturnValue(season)
        render(<Title>{season} Title</Title>)

        const title = screen.getByTestId(TEST_IDS.ui.title)
        const gradientClasses = gradient.split(' ')

        gradientClasses.forEach((className) => {
          expect(title).toHaveClass(className)
        })
      }
    )
  })

  describe('Animation', () => {
    it('should have base text styling classes', () => {
      render(<Title>Animated Title</Title>)
      const title = screen.getByTestId(TEST_IDS.ui.title)

      expect(title).toHaveClass('text-5xl')
      expect(title).toHaveClass('!font-extralight')
      expect(title).toHaveClass('bg-gradient-to-r')
      expect(title).toHaveClass('bg-clip-text')
      expect(title).toHaveClass('text-transparent')
    })

    it('should render with motion component', () => {
      // framer-motion is mocked to render as plain h1
      // Test that component renders successfully with motion props
      render(<Title>Motion Title</Title>)
      const title = screen.getByTestId(TEST_IDS.ui.title)
      expect(title).toHaveTextContent('Motion Title')
    })
  })

  describe('Integration', () => {
    it('should update gradient when season changes', () => {
      dateUtils.getCurrentSeason.mockReturnValue('spring')
      const { rerender } = render(<Title>Dynamic Title</Title>)

      let title = screen.getByTestId(TEST_IDS.ui.title)
      expect(title).toHaveClass('from-fuchsia-400')

      // Change season
      dateUtils.getCurrentSeason.mockReturnValue('winter')
      rerender(<Title>Dynamic Title</Title>)

      title = screen.getByTestId(TEST_IDS.ui.title)
      expect(title).toHaveClass('from-cyan-300')
    })

    it('should combine custom className with season gradient', () => {
      dateUtils.getCurrentSeason.mockReturnValue('summer')
      render(<Title className="mt-8">Combined</Title>)

      const title = screen.getByTestId(TEST_IDS.ui.title)
      expect(title).toHaveClass('mt-8')
      expect(title).toHaveClass('from-amber-500')
    })
  })

  describe('Error Handling', () => {
    it('should throw error when used outside SeasonProvider', async () => {
      // Suppress console.error for cleaner test output
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      // Import render from RTL directly (not the custom one with provider)
      const { render: rtlRender } = await import('@testing-library/react')

      expect(() => rtlRender(<Title>Error Test</Title>)).toThrow(
        'useSeasonContext must be used within a SeasonProvider'
      )

      consoleErrorSpy.mockRestore()
    })
  })
})
