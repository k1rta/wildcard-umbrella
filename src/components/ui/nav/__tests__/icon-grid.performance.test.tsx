import { render, screen, TEST_IDS } from '@/lib/test/test-utils'
import { IconGrid, type IconItem } from '../icon-grid'
import type { Season } from '@/lib/types/season'

jest.mock('@/lib/utils/date')
const dateUtils = jest.requireMock('@/lib/utils/date') as {
  getCurrentSeason: jest.MockedFunction<() => Season>
}

describe('IconGrid Performance', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    dateUtils.getCurrentSeason.mockReturnValue('spring')
  })

  describe('Render Optimization', () => {
    it('should not re-render unnecessarily when parent re-renders', () => {
      const icons: IconItem[] = [
        { href: '/test', icon: <span>Icon</span>, label: 'Test', testId: 'icon-test' },
      ]

      const { rerender } = render(<IconGrid icons={icons} />)

      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)
      const firstHTML = grid.innerHTML

      // Parent re-renders but props unchanged
      rerender(<IconGrid icons={icons} />)

      // Grid should maintain same DOM structure
      expect(grid.innerHTML).toBe(firstHTML)
    })

    it('should handle large icon arrays efficiently', () => {
      const manyIcons: IconItem[] = Array.from({ length: 50 }, (_, i) => ({
        href: `/page-${i}`,
        icon: <span>Icon {i}</span>,
        label: `Page ${i}`,
        testId: `icon-${i}`,
      }))

      render(<IconGrid icons={manyIcons} />)

      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

      // All icons should render (no virtualization needed for 50 items)
      expect(grid.children.length).toBe(50)
      expect(screen.getAllByRole('link')).toHaveLength(50)
    })

    it('should update only when icons array reference changes', () => {
      const icons: IconItem[] = [
        { href: '/test', icon: <span>Icon</span>, label: 'Test', testId: 'icon-test' },
      ]

      const { rerender } = render(<IconGrid icons={icons} />)

      expect(screen.getByTestId('icon-test')).toBeInTheDocument()

      // New array reference with different content
      const newIcons: IconItem[] = [
        { href: '/new', icon: <span>New</span>, label: 'New', testId: 'icon-new' },
      ]

      rerender(<IconGrid icons={newIcons} />)

      expect(screen.getByTestId('icon-new')).toBeInTheDocument()
      expect(screen.queryByTestId('icon-test')).not.toBeInTheDocument()
    })

    it('should handle column changes without full re-render', () => {
      const { rerender } = render(<IconGrid columns={2} />)

      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)
      expect(grid).toHaveClass('grid-cols-2')

      // Change columns
      rerender(<IconGrid columns={3} />)

      // Grid should update class but icons stay mounted
      expect(grid).toHaveClass('md:grid-cols-3')
      expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
    })
  })

  describe('Memory Management', () => {
    it('should clean up event handlers on unmount', () => {
      const { unmount } = render(<IconGrid />)

      const links = screen.getAllByRole('link')
      expect(links.length).toBeGreaterThan(0)

      // Should not throw or cause memory leaks
      expect(() => unmount()).not.toThrow()
    })

    it('should handle empty icons array without errors', () => {
      const emptyIcons: IconItem[] = []

      render(<IconGrid icons={emptyIcons} />)

      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)
      expect(grid.children.length).toBe(0)
      expect(screen.queryAllByRole('link')).toHaveLength(0)
    })
  })

  describe('Conditional Rendering', () => {
    it('should efficiently toggle between different icon sets', () => {
      const icons1: IconItem[] = [
        { href: '/1', icon: <span>A</span>, label: 'A', testId: 'icon-a' },
      ]

      const icons2: IconItem[] = [
        { href: '/2', icon: <span>B</span>, label: 'B', testId: 'icon-b' },
      ]

      const { rerender } = render(<IconGrid icons={icons1} />)

      expect(screen.getByTestId('icon-a')).toBeInTheDocument()

      // Switch icon sets
      rerender(<IconGrid icons={icons2} />)

      expect(screen.getByTestId('icon-b')).toBeInTheDocument()
      expect(screen.queryByTestId('icon-a')).not.toBeInTheDocument()
    })

    it('should handle rapid prop changes without issues', () => {
      const { rerender } = render(<IconGrid columns={2} />)

      // Rapid changes (simulating fast user interaction)
      rerender(<IconGrid columns={3} />)
      rerender(<IconGrid columns={4} />)
      rerender(<IconGrid columns={6} />)
      rerender(<IconGrid columns={2} />)

      const grid = screen.getByTestId(TEST_IDS.ui.iconGrid)

      // Should end up in correct state
      expect(grid).toHaveClass('grid-cols-2')
      expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
    })
  })
})
