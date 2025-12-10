import { render, screen } from '@/lib/test/test-utils'
import { Tagline, getNextLineIndex, shouldAnimate } from '../tagline'
import { CONTENT } from '@/lib/constants/content'
import { TEST_IDS } from '@/lib/constants/test-ids'

describe('Tagline', () => {
  it('does not render anything when no content is provided', () => {
    const { queryByTestId } = render(<Tagline animated lines={[]} />)
    expect(queryByTestId(TEST_IDS.text.tagline)).toBeNull()
  })

  describe('static mode', () => {
    it('renders static text with correct test id', () => {
      const text = CONTENT.TAGLINES.COMING_SOON

      render(<Tagline>{text}</Tagline>)

      const element = screen.getByTestId(TEST_IDS.text.tagline)
      expect(element).toBeInTheDocument()
      expect(element).toHaveTextContent(text)
      expect(element).toHaveClass('text-lg', 'md:text-xl', 'text-zinc-400')
      expect(element).not.toHaveClass('bg-gradient-to-r', 'text-transparent', 'bg-clip-text')
    })
  })

  describe('animated mode', () => {
    const lines = ['First line', 'Second line'] as const

    it('renders gradient styling and cursor', () => {
      render(<Tagline animated lines={lines} />)

      const element = screen.getByTestId(TEST_IDS.text.tagline)
      expect(element).toHaveClass(
        'bg-gradient-to-r',
        'text-transparent',
        'bg-clip-text',
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
