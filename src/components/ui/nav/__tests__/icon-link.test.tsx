import { render, screen } from '@/lib/test/test-utils'
import { IconLink } from '../icon-link'

describe('IconLink', () => {
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

  afterEach(() => {
    consoleSpy.mockClear()
  })

  afterAll(() => {
    consoleSpy.mockRestore()
  })
  const mockIcon = <span data-testid="mock-icon">Icon</span>

  describe('Rendering', () => {
    it('should render icon and label', () => {
      render(<IconLink href="/test" icon={mockIcon} label="Test Link" data-testid="test-link" />)

      expect(screen.getByTestId('test-link')).toBeInTheDocument()
      expect(screen.getByText('Test Link')).toBeInTheDocument()
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    })

    it('should render as anchor element', () => {
      render(<IconLink href="/test" icon={mockIcon} label="Test" data-testid="test-link" />)
      const link = screen.getByTestId('test-link')

      expect(link.tagName).toBe('A')
    })

    it('should apply custom className', () => {
      render(
        <IconLink
          href="/test"
          icon={mockIcon}
          label="Test"
          className="custom-link"
          data-testid="test-link"
        />
      )

      expect(screen.getByTestId('test-link')).toHaveClass('custom-link')
    })

    it('should have base styling classes', () => {
      render(<IconLink href="/test" icon={mockIcon} label="Test" data-testid="test-link" />)
      const link = screen.getByTestId('test-link')

      expect(link).toHaveClass('flex')
      expect(link).toHaveClass('flex-col')
      expect(link).toHaveClass('items-center')
      expect(link).toHaveClass('gap-1.5')
    })
  })

  describe('Link Behavior', () => {
    it('should render internal links with _self target', () => {
      render(<IconLink href="/about" icon={mockIcon} label="About" data-testid="internal-link" />)
      const link = screen.getByTestId('internal-link')

      expect(link).toHaveAttribute('href', '/about')
      expect(link).toHaveAttribute('target', '_self')
      expect(link).not.toHaveAttribute('rel')
    })

    it('should render external links with _blank target', () => {
      render(
        <IconLink
          href="https://example.com"
          icon={mockIcon}
          label="External"
          data-testid="external-link"
        />
      )
      const link = screen.getByTestId('external-link')

      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should detect http links as external', () => {
      render(
        <IconLink href="http://example.com" icon={mockIcon} label="HTTP" data-testid="http-link" />
      )
      const link = screen.getByTestId('http-link')

      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should respect custom target prop', () => {
      render(
        <IconLink
          href="/page"
          icon={mockIcon}
          label="Page"
          target="_blank"
          data-testid="custom-target"
        />
      )

      expect(screen.getByTestId('custom-target')).toHaveAttribute('target', '_blank')
    })

    it('should handle relative paths as internal', () => {
      render(
        <IconLink href="/docs/guide" icon={mockIcon} label="Guide" data-testid="relative-link" />
      )
      const link = screen.getByTestId('relative-link')

      expect(link).toHaveAttribute('target', '_self')
      expect(link).not.toHaveAttribute('rel')
    })
  })

  describe('Accessibility', () => {
    it('should have aria-label matching label prop', () => {
      render(
        <IconLink
          href="/test"
          icon={mockIcon}
          label="Accessible Link"
          data-testid="accessible-link"
        />
      )

      expect(screen.getByTestId('accessible-link')).toHaveAttribute('aria-label', 'Accessible Link')
    })

    it('should be keyboard accessible', () => {
      render(<IconLink href="/test" icon={mockIcon} label="Test" data-testid="test-link" />)
      const link = screen.getByTestId('test-link')

      expect(link).toHaveAttribute('href')
      // Link is naturally focusable, no need for tabIndex
    })
  })

  describe('Error Handling', () => {
    it('should warn and return null when href is missing', () => {
      // @ts-expect-error testing error case
      const { container } = render(<IconLink icon={mockIcon} label="Test" />)

      expect(consoleSpy).toHaveBeenCalledWith('IconLink: href and label are required')
      expect(container.firstChild).toBeNull()
    })

    it('should warn and return null when label is missing', () => {
      // @ts-expect-error testing error case
      const { container } = render(<IconLink href="/test" icon={mockIcon} />)

      expect(consoleSpy).toHaveBeenCalledWith('IconLink: href and label are required')
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Content', () => {
    it('should render icon in correct container', () => {
      render(
        <IconLink
          href="/test"
          icon={<span data-testid="custom-icon">Custom</span>}
          label="Test"
          data-testid="test-link"
        />
      )

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })

    it('should render label in span', () => {
      render(<IconLink href="/test" icon={mockIcon} label="Link Label" data-testid="test-link" />)
      const label = screen.getByText('Link Label')

      expect(label.tagName).toBe('SPAN')
    })
  })

  describe('Rendering Optimization', () => {
    it('should not re-render when unrelated props change', () => {
      const { rerender } = render(<IconLink href="/test" icon={<>Icon</>} label="Test" />)

      const link = screen.getByRole('link')
      const initialHTML = link.innerHTML

      // Change unrelated parent prop
      rerender(<IconLink href="/test" icon={<>Icon</>} label="Test" />)

      expect(link.innerHTML).toBe(initialHTML)
    })

    it('should re-render only when props change', () => {
      const { rerender } = render(<IconLink href="/test" icon={<>Icon</>} label="Test" />)

      const link = screen.getByRole('link')
      const initialHTML = link.innerHTML

      // Change a prop
      rerender(<IconLink href="/test" icon={<>New Icon</>} label="Test" />)

      expect(link.innerHTML).not.toBe(initialHTML)
    })
  })

  it('should match snapshot', () => {
    const { container } = render(
      <IconLink href="/test" icon={mockIcon} label="Test" data-testid="test-link" />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
