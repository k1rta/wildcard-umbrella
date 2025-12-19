import { render, screen, TEST_IDS } from '@/lib/test/test-utils'
import { Tagline, getNextLineIndex, shouldAnimate } from '../tagline'
import { CONTENT } from '@/lib/constants/content'

describe('Tagline', () => {
  it('does not render anything when no content is provided', () => {
    const { container } = render(<Tagline animated lines={[]} />)
    const tagline = container.querySelector(`[data-testid="${TEST_IDS.text.tagline}"]`)
    expect(tagline).toBeNull()
  })

  describe('wrapper spacing', () => {
    it('has correct responsive wrapper classes', () => {
      render(<Tagline>Test</Tagline>)
      const wrapper = screen.getByTestId(TEST_IDS.text.tagline).parentElement
      expect(wrapper).toHaveClass(
        'w-full',
        'max-w-4xl',
        'mx-auto',
        'px-4',
        'text-center',
        'flex',
        'items-center',
        'justify-center'
      )
    })

    it('has fixed height to prevent layout shift', () => {
      render(<Tagline>Test</Tagline>)
      const wrapper = screen.getByTestId(TEST_IDS.text.tagline).parentElement
      // Check for fixed height classes
      expect(wrapper).toHaveClass('h-24', 'sm:h-16', 'md:h-10')
    })
  })

  describe('responsive behavior', () => {
    it('allows wrapping on mobile and single line on desktop', () => {
      render(<Tagline>Test</Tagline>)
      const element = screen.getByTestId(TEST_IDS.text.tagline)
      expect(element).toHaveClass('whitespace-normal', 'md:whitespace-nowrap')
    })
  })

  describe('static mode', () => {
    it('renders static text with correct styling', () => {
      const text = CONTENT.TAGLINES.COMING_SOON

      render(<Tagline>{text}</Tagline>)

      const element = screen.getByTestId(TEST_IDS.text.tagline)
      expect(element).toBeInTheDocument()
      expect(element).toHaveTextContent(text)
      expect(element).toHaveClass(
        'text-base',
        'sm:text-lg',
        'lg:text-xl',
        'font-space',
        'font-normal',
        'tracking-wide',
        'leading-relaxed',
        'bg-gradient-to-r',
        'bg-clip-text',
        'text-transparent',
        'relative'
      )
    })
  })

  describe('animated mode', () => {
    const lines = ['First line', 'Second line'] as const

    it('renders with correct styling and cursor', () => {
      render(<Tagline animated lines={lines} />)

      const element = screen.getByTestId(TEST_IDS.text.tagline)
      expect(element).toHaveClass(
        'text-base',
        'sm:text-lg',
        'lg:text-xl',
        'font-space',
        'font-normal',
        'tracking-wide',
        'leading-relaxed',
        'bg-gradient-to-r',
        'bg-clip-text',
        'text-transparent',
        'relative'
      )

      const cursor = element.querySelector('span[aria-hidden="true"]')
      expect(cursor).toBeInTheDocument()
    })
  })

  describe('getNextLineIndex', () => {
    it('cycles through line indices correctly', () => {
      expect(getNextLineIndex(0, 3)).toBe(1)
      expect(getNextLineIndex(1, 3)).toBe(2)
      expect(getNextLineIndex(2, 3)).toBe(0)
    })

    it('handles single line case', () => {
      expect(getNextLineIndex(0, 1)).toBe(0)
    })
  })

  describe('shouldAnimate', () => {
    it('returns true only when animated, has lines and is mounted', () => {
      expect(shouldAnimate(true, ['a'], true)).toBe(true)
      expect(shouldAnimate(false, ['a'], true)).toBe(false)
      expect(shouldAnimate(true, [], true)).toBe(false)
      expect(shouldAnimate(true, ['a'], false)).toBe(false)
    })
  })
})
