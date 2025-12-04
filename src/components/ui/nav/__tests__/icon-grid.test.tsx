import { render, screen, TEST_IDS } from '@/lib/test/test-utils'
import { IconGrid, type IconItem } from '../icon-grid'
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

    it('should render custom icons when provided', () => {
      const customIcons: IconItem[] = [
        { href: '/custom', icon: <span>Icon</span>, label: 'Custom', testId: 'icon-custom' },
      ]
      render(<IconGrid icons={customIcons} />)

      expect(screen.getByTestId('icon-custom')).toBeInTheDocument()
      expect(screen.queryByTestId('icon-resume')).not.toBeInTheDocument()
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
    it('should use 3 columns by default', () => {
      render(<IconGrid />)
      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

      expect(grid).toHaveClass('md:grid-cols-3')
    })

    it('should support 2 column layout', () => {
      render(<IconGrid columns={2} />)
      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

      expect(grid).toHaveClass('grid-cols-2')
      expect(grid).toHaveClass('lg:grid-cols-2')
    })

    it('should support 4 column layout', () => {
      render(<IconGrid columns={4} />)
      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

      expect(grid).toHaveClass('grid-cols-2')
      expect(grid).toHaveClass('md:grid-cols-2')
    })

    it('should support 6 column layout', () => {
      render(<IconGrid columns={6} />)
      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

      expect(grid).toHaveClass('grid-cols-3')
      expect(grid).toHaveClass('md:grid-cols-3')
    })

    it('should have gap styling', () => {
      render(<IconGrid />)
      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

      expect(grid).toHaveClass('gap-6')
    })
  })

  describe('Icon Configuration', () => {
    it('should render empty grid when no icons provided', () => {
      render(<IconGrid icons={[]} />)
      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

      expect(grid).toBeInTheDocument()
      expect(grid.children.length).toBe(0)
    })

    it('should handle single icon', () => {
      const singleIcon: IconItem[] = [
        { href: '/test', icon: <span>Test</span>, label: 'Test', testId: 'icon-test' },
      ]
      render(<IconGrid icons={singleIcon} />)

      expect(screen.getByTestId('icon-test')).toBeInTheDocument()
      expect(screen.getAllByRole('link')).toHaveLength(1)
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

    it('should re-render with different columns class', () => {
      const { rerender } = render(<IconGrid columns={3} />)
      const grid = screen.getByRole('navigation')

      expect(grid).toHaveClass('md:grid-cols-3')

      // Change columns prop
      rerender(<IconGrid columns={2} />)

      expect(grid).toHaveClass('lg:grid-cols-2')
      expect(grid).not.toHaveClass('md:grid-cols-3')
    })
  })

  it('should match snapshot', () => {
    const { container } = render(<IconGrid />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
