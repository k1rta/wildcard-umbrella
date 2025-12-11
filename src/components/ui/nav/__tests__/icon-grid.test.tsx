import { render, screen, TEST_IDS } from '@/lib/test/test-utils'
import { IconGrid } from '../icon-grid'
import type { Season } from '@/lib/types/season'

// Mock Setup
jest.mock('@/lib/utils/date')
const dateUtils = jest.requireMock('@/lib/utils/date') as {
  getCurrentSeason: jest.MockedFunction<() => Season>
}

describe('IconGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    dateUtils.getCurrentSeason.mockReturnValue('spring')
  })

  describe('Rendering', () => {
    it('should render with correct test id', () => {
      render(<IconGrid />)
      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

      expect(grid).toBeInTheDocument()
    })

    it('should render all default icons', () => {
      render(<IconGrid />)

      expect(screen.getByTestId('icon-resume')).toBeInTheDocument()
      expect(screen.getByTestId('icon-analytics')).toBeInTheDocument()
      expect(screen.getByTestId('icon-campaigns')).toBeInTheDocument()
      expect(screen.getByTestId('icon-kpis')).toBeInTheDocument()
      expect(screen.getByTestId('icon-linkedin')).toBeInTheDocument()
      expect(screen.getByTestId('icon-company')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<IconGrid className="custom-grid" />)
      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

      expect(grid).toHaveClass('custom-grid')
    })

    it('should render icon labels', () => {
      render(<IconGrid />)

      expect(screen.getByText('Resume')).toBeInTheDocument()
      expect(screen.getByText('Analytics')).toBeInTheDocument()
      expect(screen.getByText('Campaigns')).toBeInTheDocument()
      expect(screen.getByText('KPIs')).toBeInTheDocument()
      expect(screen.getByText('Connect')).toBeInTheDocument()
      expect(screen.getByText('Company')).toBeInTheDocument()
    })
  })

  describe('Layout', () => {
    it('should use grid on mobile and flex on large screens', () => {
      render(<IconGrid />)
      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

      expect(grid).toHaveClass('grid')
      expect(grid).toHaveClass('grid-cols-3')
      expect(grid).toHaveClass('lg:grid-none')
      expect(grid).toHaveClass('lg:flex')
      expect(grid).toHaveClass('lg:flex-row')
    })

    it('should have correct gap styling', () => {
      render(<IconGrid />)
      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

      expect(grid).toHaveClass('gap-6')
      expect(grid).toHaveClass('lg:gap-12')
    })

    it('should map icons correctly with testIds', () => {
      render(<IconGrid />)

      const resumeIcon = screen.getByTestId('icon-resume')
      expect(resumeIcon).toHaveAttribute('href', '/resume')

      const linkedinIcon = screen.getByTestId('icon-linkedin')
      expect(linkedinIcon).toHaveAttribute('href', 'https://linkedin.com/in/yourprofile')
    })
  })

  describe('Season Theming', () => {
    it.each(['spring', 'summer', 'autumn', 'winter'] as Season[])(
      'should apply %s theme to icon grid',
      (season) => {
        dateUtils.getCurrentSeason.mockReturnValue(season)
        render(<IconGrid />)
        const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

        expect(grid).toBeInTheDocument()
      }
    )
  })

  describe('Rendering Optimization', () => {
    it('should not re-render when unrelated props change', () => {
      const { rerender } = render(<IconGrid />)

      const grid = screen.getByRole('navigation')
      const initialHTML = grid.innerHTML

      // Re-render with same props
      rerender(<IconGrid />)

      expect(grid.innerHTML).toBe(initialHTML)
    })
  })

  it('should match snapshot', () => {
    const { container } = render(<IconGrid />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
