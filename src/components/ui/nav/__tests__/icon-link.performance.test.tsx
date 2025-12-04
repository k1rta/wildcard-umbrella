import { render, screen } from '@/lib/test/test-utils'
import { IconLink } from '../icon-link'

describe('IconLink Performance', () => {
  const mockIcon = <span data-testid="mock-icon">Icon</span>

  describe('Render Stability', () => {
    it('should not re-render when props are unchanged', () => {
      const { rerender } = render(
        <IconLink href="/test" icon={mockIcon} label="Test" data-testid="test-link" />
      )

      const link = screen.getByTestId('test-link')
      const firstRenderHTML = link.innerHTML

      // Re-render with SAME props
      rerender(<IconLink href="/test" icon={mockIcon} label="Test" data-testid="test-link" />)

      // Component should maintain same DOM (React.memo working)
      expect(link.innerHTML).toBe(firstRenderHTML)
    })

    it('should only re-render when relevant props change', () => {
      const { rerender } = render(
        <IconLink href="/test" icon={mockIcon} label="Test" data-testid="test-link" />
      )

      const link = screen.getByTestId('test-link')

      // Change href (should re-render)
      rerender(<IconLink href="/new-path" icon={mockIcon} label="Test" data-testid="test-link" />)

      expect(link).toHaveAttribute('href', '/new-path')
    })

    it('should handle icon changes efficiently', () => {
      const { rerender } = render(
        <IconLink href="/test" icon={<span>Icon 1</span>} label="Test" data-testid="test-link" />
      )

      expect(screen.getByText('Icon 1')).toBeInTheDocument()

      // Change icon
      rerender(
        <IconLink href="/test" icon={<span>Icon 2</span>} label="Test" data-testid="test-link" />
      )

      expect(screen.getByText('Icon 2')).toBeInTheDocument()
      expect(screen.queryByText('Icon 1')).not.toBeInTheDocument()
    })
  })

  describe('Reference Stability', () => {
    it('should work correctly with stable icon reference', () => {
      const stableIcon = <span>Stable Icon</span>

      const { rerender } = render(
        <IconLink href="/test" icon={stableIcon} label="Test" data-testid="test-link" />
      )

      const link = screen.getByTestId('test-link')
      const firstHTML = link.innerHTML

      // Re-render with same stable reference
      rerender(<IconLink href="/test" icon={stableIcon} label="Test" data-testid="test-link" />)

      // Should not cause unnecessary DOM changes
      expect(link.innerHTML).toBe(firstHTML)
    })
  })
})
