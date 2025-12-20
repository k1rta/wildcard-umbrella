import { render, screen, TEST_IDS } from '@/lib/test/test-utils'
import { Title } from '../title'

// The SeasonProvider wrapper is already provided by test-utils
// So these tests should work now

describe('Title', () => {
  describe('Rendering', () => {
    it('should render with correct test id', () => {
      render(<Title>Test Title</Title>)
      expect(screen.getByTestId(TEST_IDS.ui.title)).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(<Title>Marketing & Data Professional</Title>)
      expect(screen.getByText('Marketing & Data Professional')).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<Title className="custom-class">Test</Title>)
      expect(screen.getByTestId(TEST_IDS.ui.title)).toHaveClass('custom-class')
    })
  })

  describe('Semantic HTML', () => {
    it('should render as h1 element', () => {
      render(<Title>Test</Title>)
      const title = screen.getByTestId(TEST_IDS.ui.title)
      expect(title.tagName).toBe('H1')
    })

    it('should have correct ARIA attributes', () => {
      render(<Title>Test</Title>)
      const title = screen.getByTestId(TEST_IDS.ui.title)
      expect(title).toHaveAttribute('aria-level', '1')
      expect(title).toHaveAttribute('role', 'heading')
    })
  })

  describe('Styling', () => {
    it('should have gradient text styling', () => {
      render(<Title>Test</Title>)
      const title = screen.getByTestId(TEST_IDS.ui.title)
      expect(title).toHaveClass('text-transparent', 'bg-clip-text', 'bg-gradient-to-r')
    })

    it('should have responsive text sizes', () => {
      render(<Title>Test</Title>)
      const title = screen.getByTestId(TEST_IDS.ui.title)
      expect(title).toHaveClass('text-5xl', 'sm:text-6xl', 'lg:text-7xl')
    })
  })
})
