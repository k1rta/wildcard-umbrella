import { render, screen, TEST_IDS } from '@/lib/test/test-utils'
import { Text } from '../text'

describe('Text', () => {
  describe('Animation', () => {
    it('should have animation props', () => {
      render(<Text>Animated Text</Text>)
      const text = screen.getByTestId(TEST_IDS.ui.text)

      // Since framer-motion is mocked, we can only verify the element renders
      expect(text).toBeInTheDocument()
    })

    it('should accept custom delay', () => {
      render(<Text delay={0.5}>Delayed Text</Text>)
      const text = screen.getByTestId(TEST_IDS.ui.text)
      expect(text).toBeInTheDocument()
    })
  })

  describe('Rendering', () => {
    it('should render children content', () => {
      render(<Text>Test Content</Text>)
      const text = screen.getByTestId(TEST_IDS.ui.text)
      expect(text).toHaveTextContent('Test Content')
    })

    it('should apply custom className', () => {
      render(<Text className="custom-class">Styled Text</Text>)
      const text = screen.getByTestId(TEST_IDS.ui.text)
      expect(text).toHaveClass('custom-class')
    })

    it('should render as paragraph by default', () => {
      render(<Text>Default Paragraph</Text>)
      const text = screen.getByTestId(TEST_IDS.ui.text)
      expect(text.tagName).toBe('P')
    })
  })

  describe('Styling', () => {
    it('should have base text styling classes', () => {
      render(<Text>Styled Text</Text>)
      const text = screen.getByTestId(TEST_IDS.ui.text)

      expect(text).toHaveClass('text-base')
      expect(text).toHaveClass('font-normal')
      expect(text).toHaveClass('leading-relaxed')
      expect(text).toHaveClass('tracking-wide')
    })

    it('should combine custom className with base styles', () => {
      render(<Text className="mt-4 text-gray-600">Combined Styles</Text>)
      const text = screen.getByTestId(TEST_IDS.ui.text)

      expect(text).toHaveClass('mt-4')
      expect(text).toHaveClass('text-gray-600')
      expect(text).toHaveClass('text-base')
      expect(text).toHaveClass('font-normal')
      expect(text).toHaveClass('tracking-wide')
    })
  })

  describe('Component Types', () => {
    it('should render as span when specified', () => {
      render(<Text as="span">Span Text</Text>)
      const text = screen.getByTestId(TEST_IDS.ui.text)
      expect(text.tagName).toBe('SPAN')
    })

    it('should render as div when specified', () => {
      render(<Text as="div">Div Text</Text>)
      const text = screen.getByTestId(TEST_IDS.ui.text)
      expect(text.tagName).toBe('DIV')
    })

    it('should apply role paragraph when rendered as p', () => {
      render(<Text>Paragraph Text</Text>)
      const text = screen.getByTestId(TEST_IDS.ui.text)
      expect(text).toHaveAttribute('role', 'paragraph')
    })

    it('should not apply role when rendered as other elements', () => {
      render(<Text as="div">Div Text</Text>)
      const text = screen.getByTestId(TEST_IDS.ui.text)
      expect(text).not.toHaveAttribute('role')
    })
  })
})
