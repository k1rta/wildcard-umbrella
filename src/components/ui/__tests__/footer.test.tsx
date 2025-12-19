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
      expect(footer).toHaveClass('items-center')
      expect(footer).toHaveClass('justify-center')
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

  describe('Typography', () => {
    it('should use Space Grotesk font', () => {
      render(<Footer />)
      const text = screen.getByText(/Nekmit OÜ/i)
      expect(text).toHaveClass('font-space', 'font-light')
    })

    it('should have minimal padding', () => {
      render(<Footer />)
      const footer = screen.getByTestId(TEST_IDS.ui.footer)
      expect(footer).toHaveClass('py-4')
    })
  })
})
