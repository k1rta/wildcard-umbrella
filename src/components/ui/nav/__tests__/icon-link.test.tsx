import { render, screen } from '@/lib/test/test-utils'
import { IconLink } from '../icon-link'

describe('IconLink', () => {
  const mockIcon = <span data-testid="mock-icon">Icon</span>

  describe('Rendering', () => {
    it('should render with correct test id', () => {
      render(<IconLink href="/test" icon={mockIcon} label="Test" testId="test-link" />)
      expect(screen.getByTestId('test-link')).toBeInTheDocument()
    })

    it('should render label text', () => {
      render(<IconLink href="/test" icon={mockIcon} label="Test Label" />)
      expect(screen.getByText('Test Label')).toBeInTheDocument()
    })

    it('should render icon', () => {
      render(<IconLink href="/test" icon={mockIcon} label="Test" />)
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    })
  })

  describe('Navigation', () => {
    it('should render as anchor element with correct href', () => {
      render(<IconLink href="/resume" icon={mockIcon} label="Resume" testId="resume-link" />)
      const link = screen.getByTestId('resume-link')

      expect(link.tagName).toBe('A')
      expect(link).toHaveAttribute('href', '/resume')
    })

    it('should open external links in new tab', () => {
      render(
        <IconLink
          href="https://linkedin.com"
          icon={mockIcon}
          label="LinkedIn"
          testId="linkedin-link"
        />
      )
      const link = screen.getByTestId('linkedin-link')

      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should not open internal links in new tab', () => {
      render(<IconLink href="/about" icon={mockIcon} label="About" testId="about-link" />)
      const link = screen.getByTestId('about-link')

      expect(link).toHaveAttribute('target', '_self')
      expect(link).not.toHaveAttribute('rel')
    })
  })

  describe('Styling', () => {
    it('should have base styling classes', () => {
      render(<IconLink href="/test" icon={mockIcon} label="Test" testId="test-link" />)
      const link = screen.getByTestId('test-link')

      expect(link).toHaveClass('flex', 'flex-col', 'items-center', 'gap-1.5')
    })

    it('should apply custom className', () => {
      render(
        <IconLink
          href="/test"
          icon={mockIcon}
          label="Test"
          className="custom-class"
          testId="test-link"
        />
      )
      const link = screen.getByTestId('test-link')
      expect(link).toHaveClass('custom-class')
    })
  })

  describe('Accessibility', () => {
    it('should have aria-label', () => {
      render(<IconLink href="/test" icon={mockIcon} label="Test Label" testId="test-link" />)
      const link = screen.getByTestId('test-link')
      expect(link).toHaveAttribute('aria-label', 'Test Label')
    })
  })

  describe('Error Handling', () => {
    it('should warn and return null when href is missing', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      render(<IconLink label="Test" icon={mockIcon} {...({} as { href: string })} />)

      expect(consoleSpy).toHaveBeenCalledWith('IconLink: href and label are required')
      expect(screen.queryByText('Test')).not.toBeInTheDocument()

      consoleSpy.mockRestore()
    })

    it('should warn and return null when label is missing', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      render(<IconLink href="/test" icon={mockIcon} {...({} as { label: string })} />)

      expect(consoleSpy).toHaveBeenCalledWith('IconLink: href and label are required')
      expect(screen.queryByRole('link')).not.toBeInTheDocument()

      consoleSpy.mockRestore()
    })
  })
})
