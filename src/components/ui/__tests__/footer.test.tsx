import { render, screen, TEST_IDS } from '@/lib/test/test-utils'
import { Footer } from '../footer'

describe('Footer', () => {
  describe('Rendering', () => {
    it('should render with correct test id', () => {
      render(<Footer />)
      const footer = screen.getByTestId(TEST_IDS.ui.footer)
      expect(footer).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<Footer className="custom-footer" />)
      const footer = screen.getByTestId(TEST_IDS.ui.footer)
      expect(footer).toHaveClass('custom-footer')
    })

    it('should render copyright text', () => {
      render(<Footer />)
      const footer = screen.getByTestId(TEST_IDS.ui.footer)
      expect(footer).toHaveTextContent(/© \d{4}/)
    })
  })

  describe('Layout', () => {
    it('should have base footer styling classes', () => {
      render(<Footer />)
      const footer = screen.getByTestId(TEST_IDS.ui.footer)

      expect(footer).toHaveClass('flex')
      expect(footer).toHaveClass('flex-col')
      expect(footer).toHaveClass('items-center')
      expect(footer).toHaveClass('gap-3')
      expect(footer).toHaveClass('text-center')
      expect(footer).toHaveClass('text-white/70')
      expect(footer).toHaveClass('py-6')
      expect(footer).toHaveClass('mt-auto')
      expect(footer).toHaveClass('border-t')
      expect(footer).toHaveClass('border-current/5')
    })

    it('should render as footer element', () => {
      render(<Footer />)
      const footer = screen.getByTestId(TEST_IDS.ui.footer)
      expect(footer.tagName).toBe('FOOTER')
    })
  })

  describe('Content', () => {
    it('should include current year in copyright', () => {
      const currentYear = new Date().getFullYear().toString()
      render(<Footer />)
      const footer = screen.getByTestId(TEST_IDS.ui.footer)
      expect(footer).toHaveTextContent(currentYear)
    })

    it('should display company name', () => {
      render(<Footer />)
      const footer = screen.getByTestId(TEST_IDS.ui.footer)
      expect(footer).toHaveTextContent(/Nekmit OÜ/)
    })

    it('should include rights reserved text', () => {
      render(<Footer />)
      const footer = screen.getByTestId(TEST_IDS.ui.footer)
      expect(footer).toHaveTextContent(/All rights reserved/)
    })
  })
})
