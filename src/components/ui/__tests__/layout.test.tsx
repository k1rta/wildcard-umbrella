import { render, screen, TEST_IDS } from '@/lib/test/test-utils'
import { PageLayout } from '../layout'

describe('PageLayout', () => {
  describe('Rendering', () => {
    it('should render children content', () => {
      render(
        <PageLayout>
          <div>Test Content</div>
        </PageLayout>
      )
      const layout = screen.getByTestId(TEST_IDS.page.layout)
      expect(layout).toHaveTextContent('Test Content')
    })

    it('should apply custom className', () => {
      render(
        <PageLayout className="custom-layout">
          <div>Content</div>
        </PageLayout>
      )
      const layout = screen.getByTestId(TEST_IDS.page.layout)
      const main = layout.querySelector('main')
      expect(main).toHaveClass('custom-layout')
    })
  })

  describe('Structure', () => {
    it('should render with correct structure', () => {
      render(
        <PageLayout>
          <div>Content</div>
        </PageLayout>
      )
      const layout = screen.getByTestId(TEST_IDS.page.layout)
      expect(layout.tagName).toBe('DIV')
      expect(layout.querySelector('main')).toBeInTheDocument()
      expect(layout.querySelector('footer')).toBeInTheDocument()
    })

    it('should have base layout styling classes', () => {
      render(
        <PageLayout>
          <div>Content</div>
        </PageLayout>
      )
      const layout = screen.getByTestId(TEST_IDS.page.layout)
      const main = layout.querySelector('main')

      expect(main).toHaveClass('flex-1')
      expect(main).toHaveClass('flex')
      expect(main).toHaveClass('flex-col')
      expect(main).toHaveClass('items-center')
    })
  })

  describe('Spacing', () => {
    it('should have consistent gap between elements', () => {
      render(
        <PageLayout>
          <div>Content</div>
        </PageLayout>
      )
      const layout = screen.getByTestId(TEST_IDS.page.layout)
      const main = layout.querySelector('main')
      expect(main).toHaveClass('gap-8')
    })
  })
})
